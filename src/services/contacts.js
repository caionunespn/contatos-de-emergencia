import AsyncStorage from "@react-native-async-storage/async-storage";

export const getContacts = async (user) => {
    const contacts = await AsyncStorage.getItem("@ContatosEmergencia:contacts");

    if (!contacts) {
        throw Error("Lista de contatos não foi criada");
    }

    const parsedContacts = JSON.parse(contacts);
    const userContacts = [];
    console.log(parsedContacts);
    for (const contact of parsedContacts) {
        if (contact.user === user) {
            userContacts.push(contact);
        }
    }

    return userContacts;
}

export const createContact = async (user, contact) => {
    const contacts = await AsyncStorage.getItem("@ContatosEmergencia:contacts");

    if (!contacts) {
        throw Error("Lista de contatos não foi criada");
    }

    const parsedContacts = JSON.parse(contacts);
    const userContacts = parsedContacts.filter(contact => contact.user === user);

    for (const userContact of userContacts) {
        if (userContact.id === contact.id) {
            throw Error("Este contato já está na sua lista");
        }
    }

    parsedContacts.push({
        ...contact,
        user,
    });
    await AsyncStorage.setItem("@ContatosEmergencia:contacts", JSON.stringify(parsedContacts));

    return contact;
}

export const removeContact = async (user, contactId) => {
    console.log(user);
    console.log(contactId);
    const contacts = await AsyncStorage.getItem("@ContatosEmergencia:contacts");

    if (!contacts) {
        throw Error("Lista de contatos não foi criada");
    }

    const parsedContacts = JSON.parse(contacts);
    const filteredContacts = [];
    console.log(parsedContacts);
    for (const contact of parsedContacts) {
        if (contact.id === contactId) {
            if (contact.user !== user) {
                filteredContacts.push(contact);
            }
        } else {
            filteredContacts.push(contact);
        }
    }

    await AsyncStorage.setItem("@ContatosEmergencia:contacts", JSON.stringify(filteredContacts));
}