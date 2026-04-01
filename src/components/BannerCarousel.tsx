import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Shared Colors needed for the banner
const COLORS = {
  gold: '#EDAB0C',
};

// --- BANNER DATA ---
const BANNERS = [
  { id: '1', label: 'OUR ADS & OFFERS', title: 'Get 30% off your\nfirst Metro ride 🚇', btnText: 'CLAIM NOW', bg: '#122C6F', color: '#FFFFFF', dot: COLORS.gold },
  { id: '2', label: 'WEEKEND SPECIAL', title: 'Flat ₹50 off on\nPremium Cabs 🚕', btnText: 'BOOK NOW', bg: '#EDAB0C', color: '#0E2255', dot: '#0E2255' },
  { id: '3', label: 'ECO RIDE', title: 'Free first 5km\non City Buses 🚌', btnText: 'REDEEM', bg: '#5E8704', color: '#FFFFFF', dot: '#FFFFFF' },
];

export default function BannerCarousel({ screenWidth }: { screenWidth: number }) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= BANNERS.length) nextIndex = 0;
      
      scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
      setActiveIndex(nextIndex);
    }, 3500); // Scrolls every 3.5 seconds

    return () => clearInterval(interval);
  }, [activeIndex, screenWidth]);

  return (
    <View style={styles.carouselWrapper}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setActiveIndex(newIndex);
        }}
      >
        {BANNERS.map((banner) => (
          <View key={banner.id} style={[{ width: screenWidth }, styles.bannerSlide]}>
            <View style={[styles.offerCard, { backgroundColor: banner.bg }]}>
              <View style={styles.offerContent}>
                <Text style={[styles.offerLabel, { color: banner.dot }]}>{banner.label}</Text>
                <Text style={[styles.offerTitle, { color: banner.color }]}>{banner.title}</Text>
                <View style={styles.dotsRow}>
                  {BANNERS.map((_, i) => (
                    <View key={i} style={[styles.dot, { backgroundColor: banner.color, opacity: i === activeIndex ? 1 : 0.3 }]} />
                  ))}
                </View>
              </View>
              <TouchableOpacity style={[styles.claimBtn, { backgroundColor: banner.dot }]} activeOpacity={0.8}>
                <Text style={[styles.claimBtnText, { color: banner.bg === COLORS.gold ? '#FFFFFF' : '#000000' }]}>{banner.btnText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselWrapper: { 
    marginBottom: 28 
  },
  bannerSlide: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  offerCard: { 
    width: '90%', 
    maxWidth: 500, 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    borderRadius: 24, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.2)', 
    shadowOffset: { width: 0, height: 14 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 24, 
    elevation: 10 
  },
  offerContent: { 
    flex: 1 
  },
  offerLabel: { 
    fontSize: 11, 
    fontFamily: 'Poppins-SemiBold', 
    letterSpacing: 1, 
    marginBottom: 6 
  },
  offerTitle: { 
    fontSize: 18, 
    fontFamily: 'Poppins-Bold', 
    lineHeight: 26, 
    marginBottom: 12 
  },
  dotsRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  dot: { 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    marginRight: 6 
  },
  claimBtn: { 
    borderRadius: 16, 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    elevation: 5 
  },
  claimBtnText: { 
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 12 
  },
});