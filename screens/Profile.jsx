import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';

// Galio components
import {
  Card, Block, NavBar, Icon,
} from 'galio-framework';
import theme from '../utils/theme';

import Storage from '../utils/Storage';
import Network from '../utils/Network';


const cards = [
  {
    id: 1,
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
  },
  {
    id: 2,
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
  },
  {
    id: 3,
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
    padded: true,
  },
  {
    id: 4,
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
    padded: true,
  },
];


export default class Profile extends React.Component {
    state = {
      email: null,
      loading: true,

    };

    componentDidMount() {
      Promise.all(this.getUserData())
        .then(([email]) => {
          this.setState({ email, loading: false });
          console.log('email set');
          console.log(this.email);
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
    }

    getUserData = async () => {
      this.setState({ email: await Storage.getEmail() });
    }

    handleMaps = () => {
      this.props.navigation.navigate('homeScreen');
    }

    handleSignout = async () => {
      Storage.logout();
      this.props.navigation.navigate('loginScreen');
    }


    render() {
      const {
        email,
        loading,
      } = this.state;

      if (loading) { return null; }

      return (
        <View style={styles.container}>
          <Block style={styles.container}>
            <Text style={styles.title}> Profile </Text>
            <Text style={styles.big}>
              {' '}
              {email}
              {' '}
            </Text>
            <Text>{'\n'}</Text>
            <Button title="Logout" onPress={this.handleSignout} />
            <Text>{'\n'}</Text>
            <Button title="Map" onPress={this.handleMaps} />
          </Block>

          <ScrollView contentContainerStyle={styles.cards}>
            <Block flex space="between">
              {cards && cards.map((card, id) => (
                <Card
                  key={`card-${card.image}`}
                  flex
                  borderless
                  shadowColor={theme.COLORS.BLACK}
                  titleColor={card.full ? theme.COLORS.WHITE : null}
                  style={styles.card}
                  title={card.title}
                  caption={card.caption}
                  location={card.location}
                  avatar={`${card.avatar}?${id}`}
                  footerStyle={card.full ? styles.full : null}
                >
                  {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}
                </Card>
              ))}
            </Block>
          </ScrollView>
        </View>

      );
    }
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  big: {
    fontSize: 20,
    color: '#000',
  },
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});
