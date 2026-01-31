import { View, TextInput,Button,StyleSheet,Text,FlatList,TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Book = {
    id : string,
    name : string,
    price : string

}

export default function Home() {

       const [allBook, setAllBook] = useState<Book[]>([])
    
    useEffect(() => {
        losdBook()
    }, [allBook])

    async function losdBook() {
        const data = await AsyncStorage.getItem("book")
        if(data !== null){
            setAllBook (JSON.parse(data))
        }
    }

    async function removeBook(id:string) {
        const newBook = allBook.filter((_, i) => _.id != id)
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        setAllBook(newBook)
    }
    

    return(
        <View>
            <FlatList
                data={allBook}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={{borderBottomWidth:1, marginBottom:10, padding:10, gap:10,marginTop:10,margin:10}}>
                        <Text>รหัส : {item.id}</Text>
                        <Text>ชื่อหนังสือ : {item.name}</Text>
                        <Text>ราคาหนังสือ : {item.price}</Text>

                        <TouchableOpacity onPress={() =>removeBook(item.id)}>
                            <Text style={{color:"red"}}>ลบ</Text>
                        </TouchableOpacity>

                    </View>
                )}
            />
        </View>
    )
}