import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';

const COLORS = {
  gradientTop: '#F8F4ED',
  gradientBottom: '#E8DFD1',
  navy: '#122C6F',
  navy2: '#0E2255',
  textGray: '#8A8D9F',
  lightGray: '#F5F6F8',
  green: '#00A859',
  orange: '#F58220',
  whiteGlass: 'rgba(255, 255, 255, 0.9)',
};

// --- SVG ICONS ---
const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Line x1="19" y1="12" x2="5" y2="12" />
    <Polyline points="12 19 5 12 12 5" />
  </Svg>
);

const ChevronDown = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 9l6 6 6-6" />
  </Svg>
);

const MapPinIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);

const PlusIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Line x1="12" y1="5" x2="12" y2="19" />
    <Line x1="5" y1="12" x2="19" y2="12" />
  </Svg>
);

const ClockIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.textGray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M12 6v6l4 2" />
  </Svg>
);

const HeartIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.textGray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);

// --- MOCK RECENT LOCATIONS ---
const RECENT_LOCATIONS = [
  { id: '1', title: 'SHREYARTH UNIVERSITY', address: 'Ashram Road, Ellisbridge, Ahmedabad, Gujar...' },
  { id: '2', title: 'Laxmi Bazar', address: 'Khadia, Ahmedabad, Gujarat 380002, India' },
  { id: '3', title: '2/3015', address: 'near New Bus Stand, Dharmyug Colony, Gita...' },
  { id: '4', title: 'M.J. Library BRTS Stop', address: 'Mahakavi Nhanalal Fly Overbridge, Ellisbridg...' },
  { id: '5', title: 'A21', address: 'Saibaba Society, Sardarnagar, Hansol, Ahme...' },
  { id: '6', title: 'Kalupur Railway Station Rd', address: 'Sakar Bazzar, Kalupur, Ahmedabad, Gujarat ...' },
];

export default function SearchLocationScreen({ navigation }: any) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const isSmallScreen = SCREEN_WIDTH < 375;
  const dropInputRef = useRef<TextInput>(null);

  // Auto-focus the drop location input when screen opens
  useEffect(() => {
    setTimeout(() => {
      dropInputRef.current?.focus();
    }, 100);
  }, []);

  return (
    <LinearGradient colors={[COLORS.gradientTop, COLORS.gradientBottom]} style={styles.gradientBackground}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        {/* RESPONSIVE WRAPPER */}
        <View style={styles.responsiveContainer}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Drop</Text>
            </View>
            <TouchableOpacity style={styles.forMePill}>
              <Text style={styles.forMeText}>For me</Text>
              <ChevronDown />
            </TouchableOpacity>
          </View>

          {/* INPUT CARD */}
          <View style={styles.inputCard}>
            {/* Timeline Graphic */}
            <View style={styles.timelineGraphic}>
              <View style={styles.dotGreen} />
              <View style={styles.dashedLine} />
              <View style={styles.dotOrange} />
            </View>

            {/* Inputs */}
            <View style={styles.inputColumn}>
              <TextInput
                style={styles.inputField}
                value="G-103 Sangani Platinum Narol" 
                editable={false} 
              />
              <View style={styles.divider} />
              
              {/* --- FIXED: Added onSubmitEditing and returnKeyType --- */}
              <TextInput
                ref={dropInputRef}
                style={[styles.inputField, styles.inputActive]}
                placeholder="Drop location"
                placeholderTextColor={COLORS.textGray}
                selectionColor={COLORS.navy}
                defaultValue="Shreyarth University" 
                returnKeyType="done"
                onSubmitEditing={() => navigation.navigate('RideSelection')} 
              />
            </View>
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionPill}>
              <MapPinIcon />
              <Text style={styles.actionText}>Select on map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionPill}>
              <PlusIcon />
              <Text style={styles.actionText}>Add stops</Text>
            </TouchableOpacity>
          </View>

          {/* RECENT LOCATIONS LIST */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
            {RECENT_LOCATIONS.map((loc, index) => (
              <TouchableOpacity 
                key={loc.id} 
                style={styles.listItem}
                onPress={() => navigation.navigate('RideSelection')} 
              >
                <View style={styles.listIconBox}>
                  <ClockIcon />
                </View>
                <View style={styles.listTextContent}>
                  <Text style={styles.listTitle} numberOfLines={1}>{loc.title}</Text>
                  <Text style={styles.listAddress} numberOfLines={1}>{loc.address}</Text>
                  {/* Dashed line under each item except the last one */}
                  {index !== RECENT_LOCATIONS.length - 1 && <View style={styles.itemDivider} />}
                </View>
                <TouchableOpacity style={styles.heartButton}>
                  <HeartIcon />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <View style={{ height: 40 }} />
          </ScrollView>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  
  // NEW: Responsive Container limits max width on tablets and centers it
  responsiveContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '100%',
    maxWidth: 600, // Caps width on iPads
    alignSelf: 'center', // Centers the container on large screens
  },

  // HEADER
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 12, padding: 4 },
  headerTitle: { fontSize: 24, fontFamily: 'Poppins-Bold', color: COLORS.navy2, marginTop: Platform.OS === 'android' ? 4 : 0 },
  forMePill: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.whiteGlass, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFF' },
  forMeText: { fontSize: 14, fontFamily: 'Poppins-Medium', color: COLORS.navy2, marginRight: 6, marginTop: Platform.OS === 'android' ? 2 : 0 },

  // INPUT CARD
  inputCard: {
    backgroundColor: COLORS.whiteGlass,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FFF',
    shadowColor: '#d1d5db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  timelineGraphic: { width: 20, alignItems: 'center', marginRight: 12, paddingTop: 16, paddingBottom: 16 },
  dotGreen: { width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: COLORS.green, backgroundColor: 'transparent' },
  dashedLine: { flex: 1, width: 1, borderStyle: 'dashed', borderWidth: 1, borderColor: '#D1D5DB', marginVertical: 4 },
  dotOrange: { width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: COLORS.orange, backgroundColor: 'transparent' },
  inputColumn: { flex: 1 },
  inputField: { height: 44, fontSize: 15, fontFamily: 'Poppins-Medium', color: COLORS.navy2 },
  inputActive: { fontFamily: 'Poppins-Regular' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 4 },

  // ACTION BUTTONS
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  actionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.whiteGlass,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FFF',
    marginHorizontal: 4,
    shadowColor: '#d1d5db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: { fontSize: 14, fontFamily: 'Poppins-SemiBold', color: COLORS.navy2, marginLeft: 8, marginTop: Platform.OS === 'android' ? 2 : 0 },

  // LIST
  listContainer: { paddingBottom: 20 },
  listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  listIconBox: { width: 36, alignItems: 'center', marginRight: 10 },
  listTextContent: { flex: 1, paddingVertical: 14 },
  listTitle: { fontSize: 15, fontFamily: 'Poppins-SemiBold', color: COLORS.navy2, marginBottom: 2 },
  listAddress: { fontSize: 13, fontFamily: 'Poppins-Regular', color: COLORS.textGray },
  itemDivider: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, borderStyle: 'dashed', borderWidth: 1, borderColor: '#E5E7EB' },
  heartButton: { padding: 10 },
});