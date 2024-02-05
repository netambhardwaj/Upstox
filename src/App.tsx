import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DataSchema, StockData} from './dataSchema';
import {styles} from './styles';

export const App = (): JSX.Element => {
  const [data, setData] = useState<DataSchema>();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8',
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const renderTopBanner = (): JSX.Element => {
    return (
      <View style={styles.topBanner}>
        <Text style={styles.bannerText}>{'Upstox Holding'}</Text>
      </View>
    );
  };
  const renderHoldings = (): JSX.Element => {
    return (
      <FlatList
        style={styles.flatlist}
        data={data?.userHolding}
        keyExtractor={item => item.symbol}
        renderItem={({item}) => renderStockHolding(item)}
      />
    );
  };
  const renderStockHolding = (item: StockData): JSX.Element => {
    const pnlValue = item.ltp * item.quantity - item.avgPrice * item.quantity;
    return (
      <View style={styles.stockHolding}>
        <View style={styles.container}>
          <Text style={styles.boldFont}>{item.symbol}</Text>
          <Text>
            <Text style={styles.fontColor}>{'LTP: '}</Text>
            <Text style={styles.boldFont}>{'₹' + item.ltp.toFixed(2)}</Text>
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.fontColor}>{item.quantity}</Text>
          <Text>
            <Text style={styles.fontColor}>{'P/L: '}</Text>
            <Text
              style={[
                styles.boldFont,
                {color: pnlValue < 0 ? 'red' : 'green'},
              ]}>
              {'₹ ' + pnlValue.toFixed(2)}
            </Text>
          </Text>
        </View>
      </View>
    );
  };
  const renderSummary = (): JSX.Element => {
    let todayPNL = 0;
    let totalInvestment = 0;
    let totalCurrValue = 0;
    data?.userHolding.forEach(item => {
      todayPNL += (item.close - item.ltp) * item.quantity;
      totalInvestment += item.avgPrice * item.quantity;
      totalCurrValue += item.ltp * item.quantity;
    });
    const totalPNL = totalCurrValue - totalInvestment;
    return (
      <View style={styles.summaryContainer}>
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.expandIcon}>
          <Image
            style={styles.imageStyle}
            source={
              expanded
                ? require('./assets/icons/triangle_down.png')
                : require('./assets/icons/triangle_up.png')
            }></Image>
        </TouchableOpacity>
        {expanded && (
          <View>
            <View style={styles.container}>
              <Text style={styles.boldFont}>{'Current Value:'}</Text>
              <Text style={styles.fontColor}>
                {'₹' + totalCurrValue.toFixed(2)}
              </Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.boldFont}>{'Total Investment:'}</Text>
              <Text style={styles.fontColor}>
                {'₹' + totalInvestment.toFixed(2)}
              </Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.boldFont}>{"Today's Profit & Loss:"}</Text>
              <Text style={[{color: todayPNL < 0 ? 'red' : 'green'}]}>
                {'₹' + todayPNL.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
        <View style={[styles.container, {marginTop: 10}]}>
          <Text style={styles.boldFont}>{'Profit & Loss:'}</Text>
          <Text style={[{color: totalPNL < 0 ? 'red' : 'green'}]}>
            {'₹' + totalPNL.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainView}>
      {renderTopBanner()}
      {renderHoldings()}
      {renderSummary()}
    </SafeAreaView>
  );
};

export default App;
