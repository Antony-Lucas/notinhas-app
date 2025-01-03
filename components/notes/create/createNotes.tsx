import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import useNotes from "@/hooks/notes/useNotes";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { Icon } from "@/components/ui/icon/index.web";
import { CalendarDaysIcon } from "@/components/ui/icon";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useCurrencyFormatter from "@/hooks/formatter/useCurrencyFormatter";

export default function CreateNotes({ id }: { id: number }) {
  const [showAddNotes, setShowAddNotes] = React.useState(false);

  const handleClose = () => setShowAddNotes(false);

  const actionSheetRef = useRef<ActionSheetRef>(null);
  useEffect(() => {
    if (showAddNotes) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [showAddNotes]);

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
    setDate,
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
      <ActionSheet ref={actionSheetRef} onClose={handleClose}>
        <FormControl
          size="lg"
          className="w-full flex flex-col gap-4"
          key={showAddNotes ? "add-person-key" : "default-key"}
        >
          <Input size="lg" className="w-full">
            <InputField
              className="py-0"
              placeholder="Título"
              value={title}
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
        </FormControl>
        <ThemedView className="w-full flex flex-row">
          <Button
            variant="outline"
            size="lg"
            className="w-1/2"
            onPress={() => {
              handleClose();
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
        </ThemedView>
      </ActionSheet>
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
