/**
   Copyright 2017 Vilppu Vuorinen

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 * /
/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'

import type {
  Endpoint
} from '../types'

import KeyboardAdaptive from './common/KeyboardAdaptive'
import styles from './styles/fullscreen-form'

import { endpointActions } from '../actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

type EndpointComponentProps = {
  endpoint: Endpoint,
  setEndpoint: (url: string) => void,
  submitEndpoint: (url: string) => void
}
class EndpointComponent extends Component {
  props: EndpointComponentProps;

  componentDidMount () {
  }

  render () {
    return (
      <KeyboardAdaptive style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Enter your Redmine URL
          </Text>
          <TextInput
            ref='endpointInput'
            placeholder='https://endpoint'
            value={this.props.endpoint.url}
            style={styles.input}
            onChangeText={(endpoint) => this.props.setEndpoint(endpoint)} />
          <Text style={styles.note}>
            Only https is supported.
          </Text>
          <TouchableHighlight
            activeOpacity={0.99}
            underlayColor='gray'
            disabled={!this.props.endpoint.valid}
            style={[
              styles.buttonContainer,
              { opacity: this.props.endpoint.valid
                  ? 1
                  : 0 }
            ]}
            onPress={() => {
              this.refs.endpointInput.blur()
              this.props.submitEndpoint(this.props.endpoint.url)
            }}>
            <Text style={styles.button}>Tap here to continue</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAdaptive>
    )
  }
}

export default connect(
  ({ endpoint }) => ({ endpoint }),
  (dispatch) => bindActionCreators(endpointActions, dispatch)
)(EndpointComponent)
