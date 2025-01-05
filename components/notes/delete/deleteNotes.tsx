import React from "react";
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
import { useNoteContext } from "@/context/notes/noteActionsContext";
import useNotes from "@/hooks/notes/useNotes";
import { router } from "expo-router";

export default function DeleteNotes({ id }: { id: number }) {
  const { openNoteAction, toggleMenu } = useNoteContext();

  const handleClose = () => toggleMenu();

  const { deleteNote, getNoteById } = useNotes({ personId: undefined });

  return (
    <>
      <AlertDialog isOpen={openNoteAction} onClose={handleClose} size="lg">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="lg">
              Deseja excluir esta nota?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="md">
              Excluindo esta nota todas as suas baixas e históricos também serão
              removidas, por favor, confirme se você deseja continuar
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
                deleteNote({ id: id });
                router.replace("/(notes)");
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
