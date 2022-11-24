import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';

// import { RecyclerView, DataSource } from 'react-native-android-recyclerview';
import { RecyclerView, DataSource } from 'react-native-recyclerview';

var _gCounter = 1;
function newItem() {
  return {
    id: _gCounter++,
    counter: 0,
  };
}
const INITIAL_TEXT = 'aklsdmnalksdmaslmdlasmkdkl';

export default class RecyclerViewDemo extends Component {
  constructor(props) {
    super(props);
    var data = Array(10)
      .fill()
      .map((e, i) => newItem());

    this.state = {
      dataSource: new DataSource(data, (item, index) => item.id),
      inverted: false,
      text: INITIAL_TEXT,
    };
  }

  render() {
    const { dataSource, inverted } = this.state;
    return (
      <View style={styles.container}>
        {this.renderTopControlPanel()}
        <RecyclerView
          ref={(component) => (this._recycler = component)}
          style={{ flex: 1 }}
          dataSource={dataSource}
          renderItem={this.renderItem}
          windowSize={50}
          initialScrollIndex={0}
          inverted={inverted}
          column={1}
          onScrollBeginDrag={(event) => {
            console.log('onScrollBeginDrag');
          }}
          onScroll={(event) => {
            console.log('onScroll');
          }}
          onScrollEndDrag={(event) => {
            console.log('onScrollEndDrag');
          }}
          onContentSizeChange={(event) => {
            console.log('onContentSizeChange');
          }}
          onVisibleItemsChange={(event) => {
            console.log('onVisibleItemsChange');
          }}
          ListHeaderComponent={
            <View style={{ paddingTop: 15, backgroundColor: '#eee' }} />
          }
          ListFooterComponent={
            <View style={{ paddingTop: 15, backgroundColor: '#aaa' }} />
          }
          ListEmptyComponent={
            <View
              style={{
                borderColor: '#e7e7e7',
                borderWidth: 1,
                margin: 10,
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 15 }}>Empty Component</Text>
            </View>
          }
          ItemSeparatorComponent={
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#e7e7e7',
                marginHorizontal: 5,
                marginVertical: 10,
              }}
            />
          }
        />
        {this.renderBottomControlPanel()}
      </View>
    );
  }

  renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <View>
          <Button
            title="toggle text"
            onPress={() => {
              this.setState(
                this.state.text === INITIAL_TEXT
                  ? {
                      text: `
                Create native apps for Android, iOS, and more using React
React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.

Use a little—or a lot. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.
                `,
                    }
                  : { text: INITIAL_TEXT }
              );
            }}
          />
          <Text>{this.state.text}</Text>
        </View>
      );
    }
    return (
      <ItemView
        item={item}
        index={index}
        onRemove={() => this.remove(index)}
        onAddAbove={() => this.addAbove(index)}
        onMoveUp={() => this.moveUp(index)}
        onMoveDown={() => this.moveDown(index)}
        onAddBelow={() => this.addBelow(index)}
        onIncrementCounter={() => this.incrementCounter(index)}
      />
    );
  };

  renderTopControlPanel() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e7e7e7',
        }}
      >
        <Button title={'\u002B40 \u25B2'} onPress={() => this.addToTop(40)} />
        <View style={{ width: 5 }} />
        <Button
          title={'\u002B40 \u25BC'}
          onPress={() => this.addToBottom(40)}
        />
        <View style={{ width: 15 }} />
        <Text>Scroll:</Text>
        <View style={{ width: 5 }} />
        <Button
          title={'\u25B2'}
          onPress={() =>
            this._recycler &&
            this._recycler.scrollToIndex({ index: 0, animated: true })
          }
        />
        <View style={{ width: 5 }} />
        <Button
          title={'\u25BC'}
          onPress={() => this._recycler && this._recycler.scrollToEnd()}
        />
        <View style={{ width: 5 }} />

        <Button
          title={'inverted'}
          onPress={() => {
            this.setState({ inverted: !this.state.inverted });
          }}
        />
      </View>
    );
  }

  renderBottomControlPanel() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e7e7e7',
        }}
      >
        <Button title={'Reset'} onPress={() => this.reset()} />
      </View>
    );
  }

  reset() {
    //_gCounter = 1;
    var data = Array(10)
      .fill()
      .map((e, i) => newItem());
    this.setState({
      dataSource: new DataSource(data, (item, index) => item.id),
    });
  }

  remove(index) {
    this.state.dataSource.splice(index, 1);
  }

  addAbove(index) {
    this.state.dataSource.splice(index, 0, newItem());
  }

  addBelow(index) {
    const { dataSource } = this.state;
    if (index === dataSource.size() - 1 && this._recycler) {
      this._recycler.scrollToIndex({
        animated: true,
        index: dataSource.size(),
        velocity: 120,
      });
    }

    this.state.dataSource.splice(index + 1, 0, newItem());
  }

  incrementCounter(index) {
    var item = this.state.dataSource.get(index);
    item.counter++;
    this.state.dataSource.set(index, item);
  }

  moveUp(index) {
    this.state.dataSource.moveUp(index);
  }

  moveDown(index) {
    this.state.dataSource.moveDown(index);
  }

  addToTop(size) {
    var currCount = this.state.dataSource.size();
    var newItems = Array(size)
      .fill()
      .map((e, i) => newItem());
    this.state.dataSource.splice(0, 0, ...newItems);
  }

  addToBottom(size) {
    var currCount = this.state.dataSource.size();
    var newItems = Array(size)
      .fill()
      .map((e, i) => newItem());
    this.state.dataSource.splice(currCount, 0, ...newItems);
  }
}

class ItemView extends Component {
  render() {
    const {
      item,
      index,
      onRemove,
      onAddAbove,
      onAddBelow,
      onMoveUp,
      onMoveDown,
      onIncrementCounter,
    } = this.props;
    const { id, counter } = item;
    const imageSize = 80;
    return (
      <TouchableNativeFeedback onPress={onIncrementCounter}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 5,
          }}
        >
          <Image
            source={{ uri: 'http://loremflickr.com/320/240?t=' + (id % 9) }}
            style={{
              width: imageSize,
              height: imageSize,
              marginRight: 10,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
              }}
            >
              Item #{id}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#888',
              }}
            >
              Touch to count{' '}
              {counter ? (
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  {counter}
                </Text>
              ) : null}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button title={'\u25B2'} onPress={onMoveUp} />
            <View style={{ width: 5 }} />
            <Button title={'\u25BC'} onPress={onMoveDown} />
            <View style={{ width: 5 }} />
            <Button title={'\u002B\u25B2'} onPress={onAddAbove} />
            <View style={{ width: 5 }} />
            <Button title={'\u002B\u25BC'} onPress={onAddBelow} />
            <View style={{ width: 5 }} />
            <Button color="red" title={' X '} onPress={onRemove} />
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
