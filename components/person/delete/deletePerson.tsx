import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useMenu } from "@/context/person/updatePersonContext";
import usePerson from "@/hooks/person/person";
import { router } from "expo-router";
import React, { useEffect } from "react";

export default function DeletePerson({ id }: { id: string }) {
  const { openUpdateAS, toggleMenu } = useMenu();
  const handleClose = () => toggleMenu();
  const { deletePerson, getPersonById, name, setName, personDataUpdate } =
    usePerson();

  useEffect(() => {
    if (id) {
      getPersonById({ id: String(id) });
    }
  }, [id]);

  useEffect(() => {
    if (personDataUpdate.length > 0) {
      const person = personDataUpdate[0];
      setName(person.name || "");
    }
  }, [personDataUpdate]);
  return (
    <>
      <AlertDialog isOpen={openUpdateAS} onClose={handleClose} size="lg">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="lg">
              Deseja excluir a pessoa '{name}' ?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="md">
              Excluindo o registro desta pessoa todas as suas notas e históricos
              também serão removidas, por favor, confirme se você deseja
              continuar
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="pt-6">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="lg"
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              size="lg"
              action="negative"
              onPress={() => {
                handleClose();
                deletePerson({ id: id });
                router.replace("/(tabs)");
              }}
            >
              <ButtonText>Excluir</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
