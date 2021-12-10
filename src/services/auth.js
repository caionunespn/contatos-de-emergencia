import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

export const signIn = async (payload) => {
    const users = await AsyncStorage.getItem("@ContatosEmergencia:users");
    const parsedUsers = JSON.parse(users);
    let userInfo = null;

    for (const user of parsedUsers) {
        if (user.login === payload.login) {
            if (user.password === payload.password) {
                userInfo = user;
                break;
            } else {
                throw Error("Senha incorreta");
            }
        }
    }

    if (!userInfo) {
        throw Error("Usuário não encontrado");
    } else {
        return userInfo;
    }
}

export const signUp = async (payload) => {
    const users = await AsyncStorage.getItem("@ContatosEmergencia:users");
    const parsedUsers = JSON.parse(users);
    let userExists = false;

    for (const user of parsedUsers) {
        if (user.login === payload.login) {
            userExists = true;
            break;
        }
    }

    if (!userExists) {
        const user = {
            id: uuid.v4(),
            ...payload,
        }

        const newUsers = [...parsedUsers, user];
        await AsyncStorage.setItem("@ContatosEmergencia:users", JSON.stringify(newUsers));
        return user;
    } else {
        throw Error("Um usuário já está cadastrado com esse login");
    }
}

export const update = async (id, payload) => {
    const users = await AsyncStorage.getItem("@ContatosEmergencia:users");
    const parsedUsers = JSON.parse(users);
    let userInfo = null;

    const newUsers = parsedUsers.map(user => {
        if (user.id === id) {
            const newUser = {...user, ...payload};
            userInfo = newUser;
            return newUser;
        } 

        return user;
    });

    if (!userInfo) {
        throw Error('Usuário não encontrado')
    } else {
        await AsyncStorage.setItem("@ContatosEmergencia:users", JSON.stringify(newUsers));
        return userInfo;
    }
}