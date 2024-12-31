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
import { FormControl } from "@/components/ui/form-control";
export default function CreatePerson() {
  const [showAddPerson, setShowAddPerson] = React.useState(false);
  const handleClose = () => setShowAddPerson(false);
  const {
    createPerson,
    getPersons,
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
            <Heading>Adicionar pessoa</Heading>
          </ActionsheetItem>
          <ActionsheetItem className="w-full">
            <FormControl
              size="lg"
              className="w-full flex flex-col gap-4"
              key={showAddPerson ? "add-person-key" : "default-key"}
            >
              <Input size="lg" className="w-full">
                <InputField
                  autoFocus
                  className="py-0"
                  placeholder="Nome completo"
                  onChangeText={(text) => setName(text)}
                />
              </Input>
              <Input size="lg" className="w-full">
                <InputField
                  keyboardType="phone-pad"
                  className="py-0"
                  placeholder="(00) 00000-0000"
                  onChangeText={(text) => setContact(text)}
                />
              </Input>
              <Input size="lg" className="w-full">
                <InputField
                  className="py-0"
                  placeholder="Av. Moura Carvalho"
                  onChangeText={(text) => setAdress(text)}
                />
              </Input>
              <Textarea size="lg" className="w-full">
                <TextareaInput
                  placeholder="Observação"
                  onChangeText={(text) => setObservation(text)}
                />
              </Textarea>
            </FormControl>
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
                setShowAddPerson(false);
                createPerson({ name, adress, contact, observation });
                getPersons();
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
