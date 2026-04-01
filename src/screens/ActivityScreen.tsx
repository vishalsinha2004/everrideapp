import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  useWindowDimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle, Line, Polyline, Rect } from 'react-native-svg';
import BottomBar from '../components/BottomBar';

// --- SLIM & CREAM COLOR PALETTE ---
const COLORS = {
  gradientTop: '#F8F4ED',
  gradientBottom: '#E8DFD1',
  navy: '#122C6F',
  navy2: '#0E2255',
  textGray: '#8A8D9F',
  green: '#1E8E3E',
  red: '#EF4444',
  whiteGlass: 'rgba(255, 255, 255, 0.7)',
  borderLight: 'rgba(255, 255, 255, 0.9)',
};

// --- ICONS ---
const LocationDotIcon = ({ color }: { color: string }) => (
  <Svg width="10" height="10" viewBox="0 0 24 24" fill={color} stroke="none">
    <Circle cx="12" cy="12" r="8" />
  </Svg>
);

const ChevronRight = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.textGray} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6" />
  </Svg>
);

const FilterIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Line x1="4" y1="21" x2="4" y2="14" />
    <Line x1="4" y1="10" x2="4" y2="3" />
    <Line x1="12" y1="21" x2="12" y2="12" />
    <Line x1="12" y1="8" x2="12" y2="3" />
    <Line x1="20" y1="21" x2="20" y2="16" />
    <Line x1="20" y1="12" x2="20" y2="3" />
    <Line x1="1" y1="14" x2="7" y2="14" />
    <Line x1="9" y1="8" x2="15" y2="8" />
    <Line x1="17" y1="16" x2="23" y2="16" />
  </Svg>
);

// --- REALISTIC TRANSPORT ICONS ---
const TransportIcon = ({ id, size }: { id: string, size: number }) => {
  const strokeW = "1.8";
  const svgColor = COLORS.navy2;

  switch (id) {
    case 'bike':
      return <Image source={require('../../assets/bike_icon.png')} style={{ width: size, height: size }} resizeMode="contain" />;
    case 'auto':
      return <Image source={require('../../assets/auto_icon.png')} style={{ width: size, height: size }} resizeMode="contain" />;
    case 'cab':
      return <Image source={require('../../assets/cab_icon.png')} style={{ width: size + 8, height: size + 8 }} resizeMode="contain" />;
    case 'bus':
      
              return <Image source={require('../../assets/bus_icon.png')} style={{ width: size + 8, height: size + 8 }} resizeMode="contain" />;

        
    case 'metro':
      return <Image source={require('../../assets/metro_icon.png')} style={{ width: size + 8, height: size + 8 }} resizeMode="contain" />;
    case 'multimode':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={svgColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M16 3h5v5" />
          <Path d="M4 20L21 3" />
          <Path d="M21 16v5h-5" />
          <Path d="M15 15l6 6" />
          <Path d="M4 4l5 5" />
        </Svg>
      );
    default:
      return null;
  }
};

// --- MOCK ACTIVITY DATA ---
const ACTIVITY_HISTORY = [
  { id: '1', type: 'cab', date: 'Today, 2:30 PM', price: '₹145', status: 'Completed', start: 'M.J. Library BRTS Stop', end: 'Shreyarth University' },
  { id: '2', type: 'multimode', date: 'Yesterday, 9:15 AM', price: '₹45', status: 'Completed', start: 'Laxmi Bazar', end: 'Apparel Park Metro' },
  { id: '3', type: 'auto', date: 'Mon, 28 Mar, 6:00 PM', price: '₹60', status: 'Cancelled', start: 'Kalupur Railway Station', end: 'Ellisbridge' },
  { id: '4', type: 'bike', date: 'Sat, 26 Mar, 11:20 AM', price: '₹35', status: 'Completed', start: 'Saibaba Society', end: 'Navrangpura' },
  { id: '5', type: 'metro', date: 'Thu, 24 Mar, 8:00 AM', price: '₹20', status: 'Completed', start: 'AEC Metro Station', end: 'Thaltej' },
];

export default function ActivityScreen({ navigation }: any) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('Past');

  return (
    <LinearGradient colors={[COLORS.gradientTop, COLORS.gradientBottom]} style={styles.gradientBackground}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        {/* RESPONSIVE WRAPPER */}
        <View style={styles.responsiveContainer}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Activity</Text>
            <TouchableOpacity style={styles.filterButton}>
              <FilterIcon />
            </TouchableOpacity>
          </View>

          {/* TABS */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'Past' && styles.activeTab]} 
              onPress={() => setActiveTab('Past')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === 'Past' && styles.activeTabText]}>Past</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'Upcoming' && styles.activeTab]} 
              onPress={() => setActiveTab('Upcoming')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>Upcoming</Text>
            </TouchableOpacity>
          </View>

          {/* ACTIVITY LIST */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
            
            {activeTab === 'Past' ? (
              ACTIVITY_HISTORY.map((item) => (
                <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
                  
                  {/* Card Header (Icon, Date, Price) */}
                  <View style={styles.cardHeader}>
                    <View style={styles.iconWrapper}>
                      <TransportIcon id={item.type} size={32} />
                    </View>
                    <View style={styles.headerTextCol}>
                      <Text style={styles.dateText}>{item.date}</Text>
                      <Text style={[styles.statusText, { color: item.status === 'Cancelled' ? COLORS.red : COLORS.textGray }]}>
                        {item.status}
                      </Text>
                    </View>
                    <Text style={styles.priceText}>{item.price}</Text>
                  </View>

                  <View style={styles.divider} />

                  {/* Locations Row */}
                  <View style={styles.locationsWrapper}>
                    <View style={styles.routeLineContainer}>
                      <LocationDotIcon color={COLORS.green} />
                      <View style={styles.routeLine} />
                      <LocationDotIcon color={COLORS.red} />
                    </View>
                    <View style={styles.routeTextContainer}>
                      <Text style={styles.locationText} numberOfLines={1}>{item.start}</Text>
                      <Text style={styles.locationText} numberOfLines={1}>{item.end}</Text>
                    </View>
                    <View style={styles.chevronWrapper}>
                      <ChevronRight />
                    </View>
                  </View>

                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateTitle}>No upcoming rides</Text>
                <Text style={styles.emptyStateSub}>You don't have any scheduled rides at the moment.</Text>
              </View>
            )}

            {/* Bottom Padding for BottomBar */}
            <View style={{ height: 100 }} />
          </ScrollView>

        </View>
      </SafeAreaView>

      {/* Assuming BottomBar accepts an 'activeTab' prop to highlight the current screen */}
      <BottomBar /> 
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  
  responsiveContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '100%',
    maxWidth: 600, // Capped width for tablets
    alignSelf: 'center',
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Black',
    color: COLORS.navy,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.whiteGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },

  // TABS
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textGray,
  },
  activeTabText: {
    color: COLORS.navy,
  },

  // LIST & CARDS
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.whiteGlass,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: '#d1d5db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
  },
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8F4ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD1',
    marginRight: 12,
  },
  headerTextCol: {
    flex: 1,
  },
  dateText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: COLORS.navy2,
    marginBottom: 2,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  priceText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.navy,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginVertical: 14,
  },

  locationsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeLineContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  routeLine: {
    width: 2,
    height: 14,
    backgroundColor: '#D1D5DB',
    marginVertical: 4,
  },
  routeTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 38, // Ensures proper spacing matching the dots
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: COLORS.textGray,
  },
  chevronWrapper: {
    paddingLeft: 10,
  },

  // EMPTY STATE
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyStateTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.navy,
    marginBottom: 8,
  },
  emptyStateSub: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textGray,
    textAlign: 'center',
  },
});