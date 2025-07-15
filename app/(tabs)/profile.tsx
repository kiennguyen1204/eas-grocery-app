import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { CartIcon, HeartIcon, Text } from '@/components';

// Constants
import { ERROR_MESSAGES, ROUTES } from '@/constants';

// Hooks
import { useErrorToast, useGetUser } from '@/hooks';

// Stores
import { useAuthStore } from '@/stores';

// Themes
import { baseColors, fontsFamily, fontWeights } from '@/themes';

const ProfileScreen = () => {
  const { clearAuth } = useAuthStore();
  const { user, error } = useGetUser();

  useErrorToast({
    error,
    defaultMessage: ERROR_MESSAGES.LOAD_USER_FAILED,
  });

  const handleLogout = () => {
    clearAuth();
    router.push(ROUTES.LOGIN);
  };

  const menuItems = [
    {
      id: '1',
      title: 'Edit Profile',
      onPress: () => {
        router.push(ROUTES.EDIT_PROFILE);
      },
    },
    {
      id: '2',
      title: 'Language & Currency',
      onPress: () => {},
    },
    {
      id: '3',
      title: 'Feedback',
      onPress: () => {},
    },
    {
      id: '4',
      title: 'Refer a Friend',
      onPress: () => {},
    },
    {
      id: '5',
      title: 'Terms & Conditions',
      onPress: () => {},
    },
    {
      id: '6',
      title: 'Logout',
      onPress: handleLogout,
    },
  ];

  const userName = user?.name || 'User';
  const userInitial = userName.charAt(0).toUpperCase() || 'U';
  const userEmail = user?.email || 'Email not provided';
  const userAvatar = user?.avatar;
  const userPhone = user?.phone || '123-456-7890';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.heading} size="xl">
            My Profile
          </Text>
          <View style={styles.iconGroup}>
            <HeartIcon />
            <CartIcon />
          </View>
        </View>
        <View style={styles.nameGroup}>
          <View style={styles.name}>
            {userAvatar ? (
              <Image
                source={{ uri: userAvatar }}
                style={styles.avatar}
                contentFit="cover"
                cachePolicy="memory-disk"
              />
            ) : (
              <Text style={styles.heading} size="xl">
                {userInitial}
              </Text>
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.heading}>{userName}</Text>
            <Text style={styles.infoText}>{userPhone}</Text>
            <Text style={styles.infoText}>{userEmail}</Text>
          </View>
        </View>
      </View>
      <View style={styles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              item.title !== 'Logout' && styles.borderStyle,
            ]}
            onPress={item.onPress}>
            <Text style={item.title === 'Logout' && styles.logoutText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: baseColors.whiteSoft,
  },
  header: {
    backgroundColor: baseColors.greenDark,
    paddingHorizontal: 16,
    height: '50%',
    gap: 16,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 32,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  nameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  name: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderColor: baseColors.whiteSoft,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    gap: 4,
  },
  infoText: {
    color: baseColors.whiteSoft,
  },
  menuContainer: {
    backgroundColor: baseColors.whiteSoft,
    paddingHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 3,
    position: 'absolute',
    width: '90%',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderBottomColor: baseColors.grayExtraLight,
  },
  logoutText: {
    color: baseColors.greenLight,
  },
  heading: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    color: baseColors.whitePure,
  },
});
export default ProfileScreen;
