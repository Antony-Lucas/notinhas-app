import { Modal, TouchableWithoutFeedback, View } from "react-native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import usePerson from "@/hooks/person/person";
import { Button, ButtonText } from "@/components/ui/button";
import { ThemedView } from "@/components/ThemedView";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
export default function CreatePerson() {
  const [showAddPerson, setShowAddPerson] = React.useState(false);
  const handleClose = () => setShowAddPerson(false);
  const {
    createPerson,
    clearPersonFields,
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
    <ThemedView>
      <Button
        onPress={() => setShowAddPerson(true)}
        size={"sm"}
        className="rounded-full w-16 h-16 absolute bottom-16 right-10"
      >
        <FontAwesome6 name="add" size={24} color="#ffffff" />
      </Button>
      <Actionsheet
        isOpen={showAddPerson}
        onClose={handleClose}
        className="w-full"
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <Heading>adicionar pessoa</Heading>
          </ActionsheetItem>
          <ActionsheetItem>
            <Input size="lg" className="w-full">
              <InputField
                className="py-0"
                placeholder="Nome completo"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </Input>
          </ActionsheetItem>
          <ActionsheetItem>
            <Input size="lg" className="w-full">
              <InputField
                className="py-0"
                placeholder="Contato"
                onChangeText={(text) => setContact(text)}
              />
            </Input>
          </ActionsheetItem>
          <ActionsheetItem>
            <Input size="lg" className="w-full">
              <InputField
                className="py-0"
                placeholder="Endereço"
                onChangeText={(text) => setAdress(text)}
              />
            </Input>
          </ActionsheetItem>
          <ActionsheetItem>
            <Textarea size="lg" className="w-full">
              <TextareaInput
                placeholder="Observação"
                onChangeText={(text) => setObservation(text)}
              />
            </Textarea>
          </ActionsheetItem>
          <ActionsheetItem>
            <Button
              variant="outline"
              size="lg"
              className="w-1/2"
              onPress={handleClose}
            >
              <ButtonText>Fechar</ButtonText>
            </Button>
            <Button
              size="lg"
              className="w-1/2"
              onPress={() => {
                createPerson({ name, adress, contact, observation }),
                  clearPersonFields();
              }}
            >
              <ButtonText>Adicionar</ButtonText>
            </Button>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </ThemedView>
  );
}
