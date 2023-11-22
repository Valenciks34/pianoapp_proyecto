import { useState } from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { FlatList, ScrollView } from 'react-native-gesture-handler';


import PianoButton from './components/PianoButton';
import Pentagram from './components/Pentagram';
import { notes } from '../../data/notes';

const PracticeScreen = ({_}) => {
  const [size, setSize] = useState(null);

  const onLayout = (event) => {
    setSize(event.nativeEvent.layout);
  };

  const flex = 0.6;

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.row} onLayout={onLayout}>
          { size && 
            <>
              {/* Piano */}
              <View style={{flex: flex}}>
                <FlatList 
                  data={notes}
                  keyExtractor={(item) => item.note}
                  renderItem={({item}) => {
                    return <View
                      style={{height: size.height / 7}}
                    >
                      <PianoButton item={item} />
                    </View>;
                  }}
                />
              </View>
              
    
              {/* Pentagram */}
              <View style={{flex: 1 - flex}}>
                <Pentagram />
              </View>
            </>
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow:1, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:"#fcfcfc"
  },

  row: {
    flexGrow: 0.9, 
    flexShrink: 1, 
    flexDirection: "row"
  },  

  caser: {
    height: 50, 
    backgroundColor: "#fdcb50",
    borderTopLeftRadius: 20.0,
    borderTopRightRadius: 20.0
  },

  casel: {
    height: 50, 
    backgroundColor: "#fdcb50",
    borderBottomLeftRadius: 20.0,
    borderBottomRightRadius: 20.0
  },

  note: {
    flexGrow: 1,
    backgroundColor:"white",
    borderWidth: 0.5,
    zIndex: 0
  },

  bemol: {
    position: "absolute",
    width: "40%",
    height: "40%",
    top: "-20%",
    right: 0,
    backgroundColor: "black",
    justifyContent: "center",
    zIndex: 999
  }
});

export default PracticeScreen;