import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-recyclerview' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type RecyclerviewProps = {
  color: string;
  style: ViewStyle;
};

// const ComponentName = 'RecyclerviewView';

// export const RecyclerviewView =
//   UIManager.getViewManagerConfig(ComponentName) != null
//     ? requireNativeComponent<RecyclerviewProps>(ComponentName)
//     : () => {
//         throw new Error(LINKING_ERROR);
//       };

import RecyclerView from './RecyclerViewList';
import DataSource from './DataSource';

console.log(`🚀🚀🚀🚀🚀🚀🚀🚀 `, DataSource);
export { RecyclerView, DataSource };
