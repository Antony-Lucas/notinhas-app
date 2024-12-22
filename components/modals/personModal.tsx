import { Modal, TouchableWithoutFeedback, View } from "react-native";

import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@/components/Input";
import usePerson from "@/hooks/person/person";
import { Textarea } from "@/components/Textarea";

export default function PersonModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    createPerson,
    name,
    setName,
    adress,
    setAdress,
    contact,
    setContact,
    observation,
    setObservation,
  } = usePerson();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex flex-1 justify-center items-center blur-3xl ">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View className="flex flex-1 justify-end">
              <View className="flex gap-4 rounded-t-2xl p-9 bg-primary h-4/5">
                <View className="flex flex-col gap-4">
                  <Text className="mb-4 text-start text-lg">
                    Adicionar pessoa
                  </Text>
                  <View>
                    <Input
                      value={name}
                      placeholder="Nome"
                      onChangeText={(text) => setName(text)}
                    />
                  </View>
                  <View>
                    <Input
                      placeholder="Contato"
                      value={contact}
                      onChangeText={(text) => setContact(text)}
                    />
                  </View>
                  <View>
                    <Input
                      placeholder="Endereço"
                      value={adress}
                      onChangeText={(text) => setAdress(text)}
                    />
                  </View>
                  <View>
                    <Textarea
                      placeholder="Observação"
                      value={observation}
                      onChangeText={(text) => setObservation(text)}
                    />
                  </View>
                </View>

                <View className="flex flex-row justify-end gap-3 w-full">
                  <Button
                    variant={"outline"}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text>Fechar</Text>
                  </Button>
                  <Button
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      createPerson({ name, adress, contact, observation });
                    }}
                  >
                    <Text>Adicionar</Text>
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Button
          onPress={() => setModalVisible(true)}
          size={"sm"}
          className="rounded-full w-16 h-16 absolute bottom-16 right-10"
        >
          <FontAwesome6 name="add" size={24} color="#ffffff" />
        </Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
