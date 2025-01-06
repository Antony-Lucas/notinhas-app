import { receivementType } from "@/scripts/types/receivementsType";
import { supabaseUtil } from "@/utils/supabaseUtil";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useNotes from "../notes/useNotes";
import useCurrencyFormatter from "../formatter/useCurrencyFormatter";

export default function useReceivement({ noteId }: { noteId: number }) {
  const { formatCurrency } = useCurrencyFormatter();
  const { setValue, getNoteById } = useNotes({ personId: undefined });
  const [title, setTitle] = useState("");
  const [observation, setObservation] = useState("");
  const [value, setValueR] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [receivementList, setReceivementList] = useState<any[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [inputValue, setInputValue] = useState(
    new Date().toLocaleDateString("pt-BR")
  );

  const formatValueForDatabase = (value: string): number => {
    const numeicValue = value.replace(/\./g, "").replace(",", ".");
    return parseFloat(numeicValue) || 0;
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (date: any) => {
    setDate(date);
    setInputValue(`${date.toLocaleDateString("pt-BR")}`);
    hideDatePicker();
  };

  function clearFields() {
    setTitle("");
    setObservation("");
    setValueR("");
    setDate(new Date());
  }

  const getNoteData = async () => {
    const { error, data } = await supabaseUtil
      .from("notes")
      .select("value")
      .eq("id", noteId)
      .single();

    if (error) {
      console.error("Erro ao buscar dados da nota:", error.message);
      return null;
    }
    return data?.value;
  };

  const updateNoteValue = async ({
    noteValue,
    receivementValue,
  }: {
    noteValue: number;
    receivementValue: number;
  }) => {
    const newNoteValue = noteValue - receivementValue;
    const { error, data } = await supabaseUtil
      .from("notes")
      .update({ value: newNoteValue })
      .eq("id", noteId)
      .select("value")
      .single();

    if (data) {
      setValue(formatCurrency(data.value));
      getNoteById({ id: noteId });
    }
    if (error) {
      console.error("Erro ao atualizar valor da nota:", error.message);
      throw new Error("Não foi possível atualizar o valor da nota.");
    }

    console.log("Valor da nota atualizado para:", newNoteValue);
  };

  async function getReceivements() {
    if (!noteId) return;
    try {
      const { error, data } = await supabaseUtil
        .from("receivements")
        .select("*")
        .eq("note_id", noteId);
      error ? setReceivementList([]) : setReceivementList(data || []);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function createReceivement({
    title,
    observation,
    value,
    date,
  }: receivementType) {
    try {
      const noteValue = await getNoteData();
      if (noteValue === null) {
        Alert.alert("Não foi possível obter os dados da nota.");
        return;
      }
      if (value > noteValue) {
        Alert.alert("O valor do recebimento excede o valor da nota.");
        return;
      }
      await updateNoteValue({ noteValue: noteValue, receivementValue: value });
      const create = {
        title,
        observation,
        value,
        date: date ? date.toISOString() : null,
        note_id: noteId,
        updated_at: new Date(),
      };
      const { error, data } = await supabaseUtil
        .from("receivements")
        .insert(create)
        .select("*");
      if (error) {
        console.log("erro", error);
        Alert.alert(error.message);
      }
      if (data) {
        setReceivementList((prevlist) => [...prevlist, ...data]);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  useEffect(() => {
    setReceivementList(receivementList);
    getReceivements();
  }, [receivementList]);

  return {
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
  };
}
