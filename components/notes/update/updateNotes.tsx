import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { CalendarDaysIcon, Icon, TrashIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useNoteContext } from "@/context/notes/noteActionsContext";
import useCurrencyFormatter from "@/hooks/formatter/useCurrencyFormatter";
import useNotes from "@/hooks/notes/useNotes";
import { useEffect } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import StatusNotes from "../status/statusNotes";

export default function UpdateNotes({ id }: { id: number }) {
  const { toggleMenu } = useNoteContext();
  const {
    getNotes,
    getNoteById,
    updateNote,
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
    setShowPicker,
    showPicker,
    setInputValue,
    handleConfirm,
    hideDatePicker,
    formatValueForDatabase,
  } = useNotes({ personId: undefined });

  const { formatCurrency } = useCurrencyFormatter();

  useEffect(() => {
    if (id) {
      getNoteById({ id: id });
    }
  }, [id]);

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
                if (date instanceof Date && !isNaN(date.getTime())) {
                  updateNote({
                    id,
                    title,
                    description,
                    status,
                    value: formatValueForDatabase(value),
                    date,
                  });
                } else {
                  Alert.alert("Por favor, selecione uma data válida.");
                }
                getNotes();
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
              value={date.toLocaleDateString("pt-BR")}
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
          <StatusNotes status={status} setStatus={setStatus} />
          <Textarea size="lg" className="w-full">
            <TextareaInput
              placeholder="Descrição"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </Textarea>
        </FormControl>
      </ThemedView>
      <ThemedView className="w-full flex flex-row">
        <Button className="w-full h-14 rounded-full">
          <ButtonText>Adicionar baixa</ButtonText>
        </Button>
      </ThemedView>
    </ThemedView>
  );
}
