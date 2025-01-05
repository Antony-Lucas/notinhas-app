import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Icon, TrashIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useMenu } from "@/context/person/updatePersonContext";
import usePerson from "@/hooks/person/person";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function UpdatePerson({ id }: { id?: string }) {
  const { toggleMenu } = useMenu();
  const {
    updatePerson,
    getPersonById,
    name,
    setName,
    adress,
    setAdress,
    contact,
    setContact,
    observation,
    setObservation,
    personDataUpdate,
  } = usePerson();

  useEffect(() => {
    if (id) {
      getPersonById({ id: String(id) });
    }
  }, [id]);

  useEffect(() => {
    if (personDataUpdate.length > 0) {
      const person = personDataUpdate[0];
      setName(person.name || "");
      setAdress(person.adress || "");
      setContact(person.contact || "");
      setObservation(person.observation || "");
    }
  }, [personDataUpdate]);
  return (
    <ThemedView className="h-full flex justify-between px-2 pt-4 pb-4">
      <ThemedView className="flex flex-col gap-10 ">
        <View className="flex flex-row justify-between items-center">
          <Heading>Informações</Heading>
          <View className="flex flex-row gap-4">
            <Button
              variant="solid"
              className="w-28 h-12 rounded-full"
              onPress={() => {
                updatePerson({ id, name, contact, adress, observation });
              }}
            >
              <ButtonText>Salvar</ButtonText>
            </Button>
            <Button
              variant="outline"
              className="w-12 h-12 rounded-full"
              onPress={() => toggleMenu()}
            >
              <Icon as={TrashIcon} className="text-red-500 m-2 w-6 h-6 " />
            </Button>
          </View>
        </View>
        <FormControl size="lg" className="w-full flex flex-col gap-4">
          <Input size="lg" className="w-full">
            <InputField
              className="py-0"
              placeholder="Nome completo"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </Input>
          <Input size="lg" className="w-full">
            <InputField
              keyboardType="phone-pad"
              className="py-0"
              placeholder="(00) 00000-0000"
              value={contact}
              onChangeText={(text) => setContact(text)}
            />
          </Input>
          <Input size="lg" className="w-full">
            <InputField
              className="py-0"
              placeholder="Av. Moura Carvalho"
              value={adress}
              onChangeText={(text) => setAdress(text)}
            />
          </Input>
          <Textarea size="lg" className="w-full">
            <TextareaInput
              placeholder="Observação"
              value={observation}
              onChangeText={(text) => setObservation(text)}
            />
          </Textarea>
        </FormControl>
      </ThemedView>
    </ThemedView>
  );
}
