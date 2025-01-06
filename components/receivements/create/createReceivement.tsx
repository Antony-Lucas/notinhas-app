import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { CalendarDaysIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import Modal from "react-native-modal";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useReceivementContext } from "@/context/receivement/receivementContext";
import useCurrencyFormatter from "@/hooks/formatter/useCurrencyFormatter";
import useReceivement from "@/hooks/receivements/useReceivements";
import { Alert, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text } from "@/components/ui/text";
export default function CreateReceivements({ id }: { id: number }) {
  const { openReceivementAction, toggleMenuReceivements } =
    useReceivementContext();
  const { formatCurrency } = useCurrencyFormatter();

  const {
    getReceivements,
    createReceivement,
    clearFields,
    title,
    setTitle,
    observation,
    setObservation,
    value,
    setValueR,
    date,
    setDate,
    inputValue,
    setInputValue,
    showPicker,
    setShowPicker,
    handleConfirm,
    hideDatePicker,
    formatValueForDatabase,
    receivementList,
  } = useReceivement({ noteId: id });

  return (
    <ThemedView>
      <Modal
        isVisible={openReceivementAction}
        onBackButtonPress={() => {
          toggleMenuReceivements();
        }}
        onBackdropPress={() => {
          toggleMenuReceivements();
        }}
      >
        <ThemedView className="bg-background-light p-6 py-10 rounded-lg">
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
                  setValueR(formattedValue);
                }}
              />
            </Input>

            <Textarea size="lg" className="w-full">
              <TextareaInput
                placeholder="Descrição"
                onChangeText={(text) => {
                  setObservation(text);
                }}
              />
            </Textarea>
          </FormControl>
          <View className="flex flex-row pt-10">
            <Button
              variant="outline"
              size="lg"
              className="w-1/2"
              onPress={() => {
                toggleMenuReceivements();
                clearFields();
              }}
            >
              <ButtonText>Fechar</ButtonText>
            </Button>
            <Button
              size="lg"
              className="w-1/2"
              onPress={() => {
                toggleMenuReceivements();
                if (date instanceof Date && !isNaN(date.getTime())) {
                  createReceivement({
                    title,
                    observation,
                    value: formatValueForDatabase(value),
                    date,
                  });
                  getReceivements();
                } else {
                  Alert.alert("Por favor, selecione uma data válida.");
                }
                getReceivements();
                clearFields();
              }}
            >
              <ButtonText>Adicionar</ButtonText>
            </Button>
          </View>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}
