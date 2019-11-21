import React from 'react'
import { Animated, StyleSheet } from 'react-native'

export default class ZoomClick extends React.Component {

    constructor(props) {
        super(props)
        this.shouldEnLarge = false
        this.state = {
            viewSize: new Animated.Value(this._getSize())
        }
    }

    _getSize() {
        if (this.props.shouldEnLarge) {
            return 80
        }
        return 40
    }

    componentDidUpdate() {
        Animated.spring(
            this.state.viewSize,
            {
                toValue: this._getSize()
            }
        ).start()
    }

    render() {
        return (
            <Animated.View
                style={{ width: this.state.viewSize, height: this.state.viewSize }}>
                {this.props.children}
            </Animated.View>
        )
    }
}