import { useState} from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';
 

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps{
    discord: string;
    onClose: () => void;
}

export function DuoMatch({discord, onClose,...rest}: Props) {
    const[isCopping, setIsCopping] = useState(false)

    async function handleCopyDiscordToClipboard(){
        await Clipboard.setStringAsync(discord);

        setIsCopping(true);

        Alert.alert('Discord copiado!' , "Usúario copiado para você colar no discord e encontra-lo mais rapidamente.");
        setIsCopping(false);

    }

    return (
        <Modal
            animationType='slide'
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeIcon}
                    >
                        <MaterialIcons
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />                    
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                    <Heading 
                        title="Let's play!"
                        subtitle="Agora é só começar a jogar!"
                        style={{alignItems: 'center' , marginTop: 24}}
                    />

                    <Text style={styles.label}>
                        Adicione seu discord
                    </Text>
                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipboard}
                        disabled={isCopping }
                    >
                        <Text style={styles.discord }>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </Modal>
    );
}