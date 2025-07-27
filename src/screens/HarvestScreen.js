import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import NewHarvestModal from '../components/modals/NewHarvestModal';

const HarvestScreen = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedChart, setSelectedChart] = useState('bar'); // 'bar', 'line', 'pie'
  const [harvestData, setHarvestData] = useState([]);
  const [showNewHarvestModal, setShowNewHarvestModal] = useState(false);

  // Datos de ejemplo para las cosechas
  const mockHarvestData = {
    2024: [
      { hiveId: 'Hive-001', name: 'Colmena Principal', honey: 45, pollen: 8, propolis: 2, month: 'Enero' },
      { hiveId: 'Hive-002', name: 'Colmena Norte', honey: 38, pollen: 6, propolis: 1.5, month: 'Enero' },
      { hiveId: 'Hive-003', name: 'Colmena Sur', honey: 52, pollen: 9, propolis: 2.5, month: 'Enero' },
      { hiveId: 'Hive-001', name: 'Colmena Principal', honey: 62, pollen: 12, propolis: 3, month: 'Febrero' },
      { hiveId: 'Hive-002', name: 'Colmena Norte', honey: 55, pollen: 10, propolis: 2.8, month: 'Febrero' },
      { hiveId: 'Hive-003', name: 'Colmena Sur', honey: 68, pollen: 14, propolis: 3.2, month: 'Febrero' },
      { hiveId: 'Hive-001', name: 'Colmena Principal', honey: 78, pollen: 15, propolis: 4, month: 'Marzo' },
      { hiveId: 'Hive-002', name: 'Colmena Norte', honey: 72, pollen: 13, propolis: 3.5, month: 'Marzo' },
      { hiveId: 'Hive-003', name: 'Colmena Sur', honey: 85, pollen: 18, propolis: 4.5, month: 'Marzo' },
    ],
    2023: [
      { hiveId: 'Hive-001', name: 'Colmena Principal', honey: 40, pollen: 7, propolis: 1.8, month: 'Enero' },
      { hiveId: 'Hive-002', name: 'Colmena Norte', honey: 35, pollen: 5, propolis: 1.2, month: 'Enero' },
      { hiveId: 'Hive-003', name: 'Colmena Sur', honey: 48, pollen: 8, propolis: 2.2, month: 'Enero' },
      { hiveId: 'Hive-001', name: 'Colmena Principal', honey: 58, pollen: 11, propolis: 2.8, month: 'Febrero' },
      { hiveId: 'Hive-002', name: 'Colmena Norte', honey: 52, pollen: 9, propolis: 2.5, month: 'Febrero' },
      { hiveId: 'Hive-003', name: 'Colmena Sur', honey: 65, pollen: 13, propolis: 3.1, month: 'Febrero' },
      { hiveId: 'Hive-001', name: 'Colmena Principal', honey: 75, pollen: 14, propolis: 3.8, month: 'Marzo' },
      { hiveId: 'Hive-002', name: 'Colmena Norte', honey: 68, pollen: 12, propolis: 3.2, month: 'Marzo' },
      { hiveId: 'Hive-003', name: 'Colmena Sur', honey: 82, pollen: 16, propolis: 4.2, month: 'Marzo' },
    ],
  };

  useEffect(() => {
    // Cargar datos del año seleccionado
    setHarvestData(mockHarvestData[selectedYear] || []);
  }, [selectedYear]);

  const years = [2024, 2023, 2022];

  // Preparar datos para gráficos
  const prepareChartData = () => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    const hives = ['Hive-001', 'Hive-002', 'Hive-003'];
    const hiveNames = ['Colmena Principal', 'Colmena Norte', 'Colmena Sur'];

    if (selectedChart === 'bar') {
      return {
        labels: months.slice(0, 3), // Solo primeros 3 meses para el ejemplo
        datasets: hives.map((hiveId, index) => ({
          data: months.slice(0, 3).map(month => {
            const monthData = harvestData.filter(d => d.hiveId === hiveId && d.month === month);
            return monthData.length > 0 ? monthData[0].honey : 0;
          }),
          color: (opacity = 1) => {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
            return colors[index];
          },
          strokeWidth: 2,
        })),
      };
    } else if (selectedChart === 'line') {
      return {
        labels: months.slice(0, 3),
        datasets: hives.map((hiveId, index) => ({
          data: months.slice(0, 3).map(month => {
            const monthData = harvestData.filter(d => d.hiveId === hiveId && d.month === month);
            return monthData.length > 0 ? monthData[0].honey : 0;
          }),
          color: (opacity = 1) => {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
            return colors[index];
          },
          strokeWidth: 3,
        })),
      };
    } else if (selectedChart === 'pie') {
      // Para el gráfico de pie, mostrar producción total por colmena
      const totalByHive = hives.map(hiveId => {
        const hiveData = harvestData.filter(d => d.hiveId === hiveId);
        return hiveData.reduce((sum, item) => sum + item.honey, 0);
      });

      return totalByHive.map((value, index) => ({
        name: hiveNames[index],
        population: value,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1'][index],
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      }));
    }
  };

  const chartData = prepareChartData();

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const renderChart = () => {
    if (selectedChart === 'bar') {
      return (
        <BarChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero={true}
        />
      );
    } else if (selectedChart === 'line') {
      return (
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      );
    } else if (selectedChart === 'pie') {
      return (
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      );
    }
  };

  const getTotalProduction = () => {
    return harvestData.reduce((sum, item) => sum + item.honey, 0);
  };

  const getAverageProduction = () => {
    const uniqueHives = [...new Set(harvestData.map(item => item.hiveId))];
    return uniqueHives.length > 0 ? getTotalProduction() / uniqueHives.length : 0;
  };

  const handleAddHarvest = (newHarvest) => {
    // Agregar la nueva cosecha a los datos
    const updatedData = [...harvestData, newHarvest];
    setHarvestData(updatedData);
    
    // Actualizar los datos mock para persistencia temporal
    if (!mockHarvestData[selectedYear]) {
      mockHarvestData[selectedYear] = [];
    }
    mockHarvestData[selectedYear].push(newHarvest);
    
    Alert.alert('Éxito', 'Cosecha registrada correctamente');
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Cosechas y Producción</Text>
              <Text style={styles.subtitle}>Comparativa entre colmenas</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowNewHarvestModal(true)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Selector de año */}
        <View style={styles.yearSelector}>
          <Text style={styles.sectionTitle}>Año de Producción</Text>
          <View style={styles.yearButtons}>
            {years.map(year => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.yearButton,
                  selectedYear === year && styles.selectedYearButton,
                ]}
                onPress={() => setSelectedYear(year)}
              >
                <Text
                  style={[
                    styles.yearButtonText,
                    selectedYear === year && styles.selectedYearButtonText,
                  ]}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selector de tipo de gráfico */}
        <View style={styles.chartSelector}>
          <Text style={styles.sectionTitle}>Tipo de Gráfico</Text>
          <View style={styles.chartButtons}>
            <TouchableOpacity
              style={[
                styles.chartButton,
                selectedChart === 'bar' && styles.selectedChartButton,
              ]}
              onPress={() => setSelectedChart('bar')}
            >
              <Text
                style={[
                  styles.chartButtonText,
                  selectedChart === 'bar' && styles.selectedChartButtonText,
                ]}
              >
                Barras
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chartButton,
                selectedChart === 'line' && styles.selectedChartButton,
              ]}
              onPress={() => setSelectedChart('line')}
            >
              <Text
                style={[
                  styles.chartButtonText,
                  selectedChart === 'line' && styles.selectedChartButtonText,
                ]}
              >
                Líneas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chartButton,
                selectedChart === 'pie' && styles.selectedChartButton,
              ]}
              onPress={() => setSelectedChart('pie')}
            >
              <Text
                style={[
                  styles.chartButtonText,
                  selectedChart === 'pie' && styles.selectedChartButtonText,
                ]}
              >
                Circular
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Estadísticas rápidas */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{getTotalProduction()} kg</Text>
            <Text style={styles.statLabel}>Producción Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{getAverageProduction().toFixed(1)} kg</Text>
            <Text style={styles.statLabel}>Promedio por Colmena</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{harvestData.length > 0 ? harvestData.length / 3 : 0}</Text>
            <Text style={styles.statLabel}>Colmenas Activas</Text>
          </View>
        </View>

        {/* Gráfico */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>
            {selectedChart === 'pie' ? 'Producción Total por Colmena' : 'Producción Mensual de Miel (kg)'}
          </Text>
          <View style={styles.chartWrapper}>
            {renderChart()}
          </View>
        </View>

        {/* Leyenda */}
        {selectedChart !== 'pie' && (
          <View style={styles.legendContainer}>
            <Text style={styles.sectionTitle}>Leyenda</Text>
            <View style={styles.legendItems}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#FF6B6B' }]} />
                <Text style={styles.legendText}>Colmena Principal</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#4ECDC4' }]} />
                <Text style={styles.legendText}>Colmena Norte</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#45B7D1' }]} />
                <Text style={styles.legendText}>Colmena Sur</Text>
              </View>
            </View>
          </View>
        )}

        {/* Tabla de datos detallados */}
        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Datos Detallados</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Colmena</Text>
            <Text style={styles.tableHeaderText}>Mes</Text>
            <Text style={styles.tableHeaderText}>Miel (kg)</Text>
            <Text style={styles.tableHeaderText}>Polen (kg)</Text>
          </View>
          {harvestData.slice(0, 9).map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.month}</Text>
              <Text style={styles.tableCell}>{item.honey}</Text>
              <Text style={styles.tableCell}>{item.pollen}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal para agregar nueva cosecha */}
      <NewHarvestModal
        visible={showNewHarvestModal}
        onClose={() => setShowNewHarvestModal(false)}
        onSave={handleAddHarvest}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  yearSelector: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  yearButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  yearButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  selectedYearButton: {
    backgroundColor: '#27ae60',
    borderColor: '#27ae60',
  },
  yearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  selectedYearButtonText: {
    color: '#ffffff',
  },
  chartSelector: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 10,
  },
  chartButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  chartButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  selectedChartButton: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  chartButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  selectedChartButtonText: {
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 10,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 10,
  },
  chartWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  legendContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 10,
  },
  legendItems: {
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    textAlign: 'center',
  },
});

export default HarvestScreen; 