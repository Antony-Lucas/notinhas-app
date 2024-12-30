import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import usePerson from "@/hooks/person/person";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function PersonScreen() {
  const item = useLocalSearchParams();
  const {
    updatePerson,
    personDataUpdate,
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
    <ThemedView className="h-screen flex items-center justify-center">
      <FormControl size="md">
        <Heading>{personDataUpdate}</Heading>
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input size="lg" className="w-full">
          <InputField
            className="py-0"
            placeholder="Nome completo"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>
            Must be atleast 6 characters.
          </FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            Atleast 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <Button
        className="w-fit self-end mt-4"
        size="sm"
        onPress={() => {
          updatePerson;
        }}
      >
        <ButtonText>Submit</ButtonText>
      </Button>
    </ThemedView>
  );
}
