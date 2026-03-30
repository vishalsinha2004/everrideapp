import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import TopNavbar from '../components/TopNavbar';
import BottomBar from '../components/BottomBar';

const COLORS = {
  gradientTop: '#F8F4ED',
  gradientBottom: '#E8DFD1',
  navy: '#122C6F',
  gold: '#EDAB0C',
  textGray: '#8A8D9F',
  whiteGlass: 'rgba(255, 255, 255, 0.85)',
};

interface MenuItem {
  id: string;
  label: string;
  icon: (color: string, size: string) => React.ReactNode;
}

// PROFESSIONAL SVG CHEVRON
const ChevronIcon = ({ color, size }: { color: string, size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6" />
  </Svg>
);

// ACCOUNT MENU ITEMS WITH CORRECTED PROFESSIONAL ICONS
const MENU_ITEMS: MenuItem[] = [
  {
    id: 'favourites',
    label: 'Favourites',
    icon: (color, size) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </Svg>
    ),
  },
  {
    id: 'transit',
    label: 'Transit Preferences',
    icon: (color, size) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <Circle cx="7" cy="17" r="2" />
        <Path d="M9 17h6" />
        <Circle cx="17" cy="17" r="2" />
      </Svg>
    ),
  },
  {
    id: 'payment',
    label: 'Payment Management',
    icon: (color, size) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="2" y="7" width="20" height="13" rx="2" ry="2" />
        <Path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </Svg>
    ),
  },
  {
    id: 'share',
    label: 'Share with Friends',
    icon: (color, size) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="18" cy="5" r="3" />
        <Circle cx="6" cy="12" r="3" />
        <Circle cx="18" cy="19" r="3" />
        <Path d="M8.59 13.51l6.83 3.98" />
        <Path d="M15.41 6.51l-6.82 3.98" />
      </Svg>
    ),
  },
  {
    id: 'rides',
    label: 'My Rides',
    icon: (color, size) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <Circle cx="9" cy="7" r="4" />
        <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </Svg>
    ),
  },
  {
    id: 'support',
    label: 'Help and Support',
    icon: (color, size) => (
      // FIXED: Swapped out the old "Home" icon for a professional Headphones icon
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <Path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </Svg>
    ),
  },
  {
    id: 'safety',
    label: 'Safety',
    icon: (color, size) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <Path d="M10 17l2 2 4-4" />
      </Svg>
    ),
  },
  {
    id: 'about',
    label: 'About Us',
    icon: (color, size) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="10" />
        <Path d="M12 16v-4" />
        <Path d="M12 8h.01" />
      </Svg>
    ),
  },
  {
    id: 'language',
    label: 'App Language',
    icon: (color, size) => (
      // FIXED: Swapped out the old text icon for a professional Globe icon
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="10" />
        <Line x1="2" y1="12" x2="22" y2="12" />
        <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </Svg>
    ),
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: (color, size) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
        <Path d="M17 16l4-4m0 0l-4-4m4 4H7m0 0v0" />
      </Svg>
    ),
  },
];

// MENU ITEM COMPONENT
const MenuItemComponent = ({ item, isSmallScreen }: { item: MenuItem, isSmallScreen: boolean }) => {
  const iconSize = isSmallScreen ? '20' : '22';
  const chevronSize = isSmallScreen ? 16 : 18;

  return (
    <TouchableOpacity style={styles.menuItemWrapper} activeOpacity={0.6}>
      <View style={styles.menuItemContent}>
        <View style={[styles.iconWrapper, isSmallScreen && { width: 36, height: 36, borderRadius: 10 }]}>
          {item.icon(COLORS.navy, iconSize)}
        </View>
        <Text style={[styles.menuLabel, isSmallScreen && { fontSize: 14 }]}>{item.label}</Text>
      </View>
      <ChevronIcon color={COLORS.textGray} size={chevronSize} />
    </TouchableOpacity>
  );
};

export default function AccountScreen() {
  // TRUE RESPONSIVE MATH
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const isSmallScreen = SCREEN_WIDTH < 375;

  return (
    <LinearGradient colors={[COLORS.gradientTop, COLORS.gradientBottom]} style={styles.gradientBackground}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        <TopNavbar scrollY={undefined} />

        <ScrollView 
          contentContainerStyle={[styles.scrollContent, isSmallScreen && { paddingHorizontal: 16 }]} 
          showsVerticalScrollIndicator={false}
        >
          {/* RESPONSIVE WRAPPER: Centers content and prevents extreme stretching on Tablets/iPads */}
          <View style={styles.responsiveWrapper}>
            
            {/* PROFILE SECTION */}
            <View style={[styles.profileSection, isSmallScreen && { marginBottom: 20 }]}>
              <View style={styles.profileHeader}>
                <View style={[styles.avatarCircle, isSmallScreen && { width: 56, height: 56, borderRadius: 28 }]}>
                  <Text style={[styles.avatarInitial, isSmallScreen && { fontSize: 22 }]}>V</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={[styles.phoneNumber, isSmallScreen && { fontSize: 16 }]}>+91 91319 72545</Text>
                  <TouchableOpacity activeOpacity={0.6}>
                    <Text style={[styles.viewProfile, isSmallScreen && { fontSize: 13 }]}>View Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* MENU ITEMS - FIRST GROUP */}
            <View style={styles.menuGroup}>
              {MENU_ITEMS.slice(0, 3).map((item) => (
                <MenuItemComponent key={item.id} item={item} isSmallScreen={isSmallScreen} />
              ))}
            </View>

            {/* MENU ITEMS - SECOND GROUP */}
            <View style={[styles.menuGroup, { marginTop: isSmallScreen ? 16 : 20 }]}>
              {MENU_ITEMS.slice(3, 7).map((item) => (
                <MenuItemComponent key={item.id} item={item} isSmallScreen={isSmallScreen} />
              ))}
            </View>

            {/* MENU ITEMS - THIRD GROUP */}
            <View style={[styles.menuGroup, { marginTop: isSmallScreen ? 16 : 20 }]}>
              {MENU_ITEMS.slice(7).map((item) => (
                <MenuItemComponent key={item.id} item={item} isSmallScreen={isSmallScreen} />
              ))}
            </View>

          </View>

          {/* Bottom spacer so the list doesn't hide behind the BottomBar */}
          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>

      {/* ACTIVE TAB HIGHLIGHT */}
      <BottomBar/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  safeArea: { flex: 1 },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  
  // TABLET RESPONSIVENESS
  responsiveWrapper: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },

  // PROFILE SECTION
  profileSection: {
    marginBottom: 28,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.whiteGlass,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#d1d5db',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarInitial: {
    fontSize: 24, 
    fontFamily: 'Poppins-SemiBold', // Upgraded to SemiBold for cleaner readability
    color: '#FFFFFF',
    marginTop: Platform.OS === 'android' ? 4 : 0,
  },
  profileInfo: {
    flex: 1,
  },
  phoneNumber: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold', // Professional slim weight
    color: COLORS.navy,
    marginBottom: 2,
  },
  viewProfile: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium', // Upgraded to Medium for better clickability perception
    color: COLORS.textGray,
  },

  // MENU GROUPS
  menuGroup: {
    backgroundColor: COLORS.whiteGlass, 
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#d1d5db',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },

  // MENU ITEM
  menuItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(18, 44, 111, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 15, 
    fontFamily: 'Poppins-Medium', // Ensures consistent sleek font
    color: COLORS.navy,
    marginTop: Platform.OS === 'android' ? 2 : 0,
  },
});