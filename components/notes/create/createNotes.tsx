import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import useNotes from "@/hooks/notes/useNotes";
import React, { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Icon } from "@/components/ui/icon/index.web";
import { CalendarDaysIcon } from "@/components/ui/icon";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useCurrencyFormatter from "@/hooks/formatter/useCurrencyFormatter";
import Modal from "react-native-modal";
import StatusNotes from "../status/statusNotes";
import { Text } from "@/components/ui/text";

export default function CreateNotes({ id }: { id: number }) {
  const [showAddNotes, setShowAddNotes] = useState(false);
  const { formatCurrency } = useCurrencyFormatter();

  const {
    createNote,
    getNotes,
    setTitle,
    title,
    setDescription,
    description,
    setStatus,
    status,
    setValue,
    value,
    date,
    setInputValue,
    inputValue,
    setShowPicker,
    showPicker,
    clearFields,
    handleConfirm,
    hideDatePicker,
    formatValueForDatabase,
  } = useNotes({ personId: id });

  return (
    <ThemedView>
      <Modal
        isVisible={showAddNotes}
        onBackButtonPress={() => {
          setShowAddNotes(false);
        }}
        onBackdropPress={() => {
          setShowAddNotes(false);
        }}
      >
        <ThemedView className="bg-background-light p-6 py-10 rounded-lg">
          <Text>{status}</Text>
          <FormControl size="lg" className="w-full flex flex-col gap-4 ">
            <Input size="lg" className="w-full">
              <InputField
                className="py-0"
                placeholder="Título"
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
            </Input>
            <Input isDisabled size="lg" className="w-full">
              <InputField
                keyboardType="phone-pad"
                className="py-0"
                placeholder="DD/MM/YYYY"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
              />
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                className="p-2 ml-4 rounded-sm bg-secondary-950"
              >
                <Icon
                  as={CalendarDaysIcon}
                  className="text-typography-800 m-2 w-6 h-6"
                />
                <DateTimePickerModal
                  isVisible={showPicker}
                  mode="date"
                  locale="pt-BR"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </TouchableOpacity>
            </Input>
            <Input size="lg" className="w-full">
              <InputField
                keyboardType="phone-pad"
                className="py-0"
                placeholder="0,00"
                value={formatCurrency(value)}
                onChangeText={(text) => {
                  let formattedValue = formatCurrency(text);
                  setValue(formattedValue);
                }}
              />
            </Input>

            <Textarea size="lg" className="w-full">
              <TextareaInput
                placeholder="Descrição"
                onChangeText={(text) => {
                  setDescription(text);
                }}
              />
            </Textarea>
            <StatusNotes status={status} setStatus={setStatus} />
          </FormControl>
          <View className="flex flex-row pt-10">
            <Button
              variant="outline"
              size="lg"
              className="w-1/2"
              onPress={() => {
                setShowAddNotes(false);
                clearFields();
              }}
            >
              <ButtonText>Fechar</ButtonText>
            </Button>
            <Button
              size="lg"
              className="w-1/2"
              onPress={() => {
                setShowAddNotes(false);
                if (date instanceof Date && !isNaN(date.getTime())) {
                  createNote({
                    title,
                    description,
                    status,
                    value: formatValueForDatabase(value),
                    date,
                  });
                  getNotes();
                } else {
                  Alert.alert("Por favor, selecione uma data válida.");
                }
                clearFields();
                getNotes();
              }}
            >
              <ButtonText>Adicionar</ButtonText>
            </Button>
          </View>
        </ThemedView>
      </Modal>

      <Button
        onPress={() => setShowAddNotes(true)}
        size={"lg"}
        className="w-full h-14"
      >
        <ButtonText>Adicionar nota</ButtonText>
      </Button>
    </ThemedView>
  );
}
