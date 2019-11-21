import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'

class Avatar extends React.Component {

    constructor(props) {
        super(props)
        this._avatarClicked = this._avatarClicked.bind(this)
    }

    _avatarClicked() {
        ImagePicker.showImagePicker({}, response => {
            if (response.didCancel) {
                console.log('l\'utilisateur a annulé')
            }
            else if (response.error) {
                console.log('error', response.error)
            }
            else {
                console.log('Photo:', response.uri)
                let requireSource = { uri: response.uri }
                const action = { type: "SET_AVATAR", value: requireSource }
                this.props.dispatch(action)
            }
        })
    }
    render() {
        return (
            <TouchableOpacity
                style={styles.avatar_container}
                onPress={this._avatarClicked}>
                <Image style={styles.avatar_image}
                    source={this.props.avatar} />
            </TouchableOpacity>

        )
    }
}
const mapStateToProps = state => {
    return { avatar: state.setAvatar.avatar }
}

export default connect(mapStateToProps)(Avatar)

const styles = StyleSheet.create({
    avatar_container: {
        margin: 5,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar_image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    }

})