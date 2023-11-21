import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { Canvas, Circle, Paint, vec,  Line, Path } from "@shopify/react-native-skia";

const notes = ["C", "D", "E", "F", "G", "A", "B"];

// const path = Path.Make();
// path.moveTo(128, 0);
// path.lineTo(168, 80);
// path.lineTo(256, 93);
// path.lineTo(192, 155);
// path.lineTo(207, 244);
// path.lineTo(128, 202);
// path.lineTo(49, 244);
// path.lineTo(64, 155);
// path.lineTo(0, 93);
// path.lineTo(88, 80);
// path.lineTo(128, 0);
// path.close();

const Pentagram = () => {
  const { value } = useSelector((state) => state.piano);

  const [size, setSize] = useState(null);

  const onLayout = (event) => {
    setSize(event.nativeEvent.layout);
  };

  return (
    <View style={{flex:1, overflow: "visible"}} onLayout={onLayout}>
      {
        size &&
          <Canvas style={{flex:1.0, overflow: "visible"}}>


            {
              Array.from({length: 5}).map((_, index) => {
                const x = index * (size.width / 4);

                return <Line
                  key={index.toString()}
                  p1={vec(x , 0)}
                  p2={vec(x , size.height)}
                  color="#000000"
                  strokeWidth={4}
                />;
              })
            }

            <Path
              origin={vec(20 * 0.5, 20 * 2)}
              transform={[{rotate: -4.7}, {translateX: -15,}, {scale:2}]}
              path={"m12.049 3.5296c0.305 3.1263-2.019 5.6563-4.0772 7.7014-0.9349 0.897-0.155 0.148-0.6437 0.594-0.1022-0.479-0.2986-1.731-0.2802-2.11 0.1304-2.6939 2.3198-6.5875 4.2381-8.0236 0.309 0.5767 0.563 0.6231 0.763 1.8382zm0.651 16.142c-1.232-0.906-2.85-1.144-4.3336-0.885-0.1913-1.255-0.3827-2.51-0.574-3.764 2.3506-2.329 4.9066-5.0322 5.0406-8.5394 0.059-2.232-0.276-4.6714-1.678-6.4836-1.7004 0.12823-2.8995 2.156-3.8019 3.4165-1.4889 2.6705-1.1414 5.9169-0.57 8.7965-0.8094 0.952-1.9296 1.743-2.7274 2.734-2.3561 2.308-4.4085 5.43-4.0046 8.878 0.18332 3.334 2.5894 6.434 5.8702 7.227 1.2457 0.315 2.5639 0.346 3.8241 0.099 0.2199 2.25 1.0266 4.629 0.0925 6.813-0.7007 1.598-2.7875 3.004-4.3325 2.192-0.5994-0.316-0.1137-0.051-0.478-0.252 1.0698-0.257 1.9996-1.036 2.26-1.565 0.8378-1.464-0.3998-3.639-2.1554-3.358-2.262 0.046-3.1904 3.14-1.7356 4.685 1.3468 1.52 3.833 1.312 5.4301 0.318 1.8125-1.18 2.0395-3.544 1.8325-5.562-0.07-0.678-0.403-2.67-0.444-3.387 0.697-0.249 0.209-0.059 1.193-0.449 2.66-1.053 4.357-4.259 3.594-7.122-0.318-1.469-1.044-2.914-2.302-3.792zm0.561 5.757c0.214 1.991-1.053 4.321-3.079 4.96-0.136-0.795-0.172-1.011-0.2626-1.475-0.4822-2.46-0.744-4.987-1.116-7.481 1.6246-0.168 3.4576 0.543 4.0226 2.184 0.244 0.577 0.343 1.197 0.435 1.812zm-5.1486 5.196c-2.5441 0.141-4.9995-1.595-5.6343-4.081-0.749-2.153-0.5283-4.63 0.8207-6.504 1.1151-1.702 2.6065-3.105 4.0286-4.543 0.183 1.127 0.366 2.254 0.549 3.382-2.9906 0.782-5.0046 4.725-3.215 7.451 0.5324 0.764 1.9765 2.223 2.7655 1.634-1.102-0.683-2.0033-1.859-1.8095-3.227-0.0821-1.282 1.3699-2.911 2.6513-3.198 0.4384 2.869 0.9413 6.073 1.3797 8.943-0.5054 0.1-1.0211 0.143-1.536 0.143z"}
            />
          </Canvas>
      }
    </View>
  );

  // return (
  //   <View style={{flex:1, alignItems: "center", justifyContent:"center"}}>
  //     {
  //       notes.map((item) => {
  //         return <Text
  //           key={item}
  //           style={{color: value.includes(item) ? "white" : "black" }}
  //         >
  //           {item}
  //         </Text>;
  //       })
  //     }
  //   </View>
  // );
};

export default Pentagram;