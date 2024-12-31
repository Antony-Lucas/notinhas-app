import { ThemedView } from "@/components/ThemedView";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import useNotes from "@/context/notes/useNotes";
import React from "react";
import { Alert } from "react-native";

export default function CreateNotes({ id }: { id: number }) {
  const [showAddNotes, setShowAddNotes] = React.useState(false);
  const handleClose = () => setShowAddNotes(false);
  const {
    createNote,
    getNotes,
    setDescription,
    description,
    setValue,
    value,
    setDate,
    date,
  } = useNotes({ personId: id });
  return (
    <ThemedView className="">
      <Button
        onPress={() => setShowAddNotes(true)}
        size={"lg"}
        className="w-full h-14"
      >
        <ButtonText>Adicionar nota</ButtonText>
      </Button>
      <Actionsheet
        isOpen={showAddNotes}
        onClose={handleClose}
        className="w-full"
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <Heading>Adicionar Nota</Heading>
          </ActionsheetItem>
          <ActionsheetItem className="w-full">
            <FormControl
              size="lg"
              className="w-full flex flex-col gap-4"
              key={showAddNotes ? "add-person-key" : "default-key"}
            >
              <Input size="lg" className="w-full">
                <InputField
                  className="py-0"
                  placeholder="DD/MM/YYYY"
                  onChangeText={(text) => {
                    const dateParts = text.split("/");
                    if (dateParts.length === 3) {
                      const [day, month, year] = dateParts.map(Number);
                      const parsedDate = new Date(year, month - 1, day);
                      if (!isNaN(parsedDate.getTime())) {
                        setDate(parsedDate);
                      }
                    }
                  }}
                  value={date ? date.toLocaleDateString("pt-BR") : ""}
                />
              </Input>
              <Input size="lg" className="w-full">
                <InputField
                  keyboardType="phone-pad"
                  className="py-0"
                  placeholder="0,00"
                  onChangeText={(text) => {
                    const numericValue = text
                      .replace(/[^0-9,.]/g, "")
                      .replace(",", ".");
                    const parsedValue = parseFloat(numericValue);
                    if (!isNaN(parsedValue)) {
                      setValue(parsedValue);
                    }
                  }}
                />
              </Input>

              <Textarea size="lg" className="w-full">
                <TextareaInput
                  placeholder="Descrição"
                  onChangeText={(text) => setDescription(text)}
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
                setShowAddNotes(false);
                if (date instanceof Date && !isNaN(date.getTime())) {
                  createNote({ description, value, date });
                  getNotes();
                } else {
                  Alert.alert("Por favor, selecione uma data válida.");
                }
                getNotes();
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
