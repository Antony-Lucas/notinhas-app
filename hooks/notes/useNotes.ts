import { useEffect, useState } from "react";
import { noteType } from "@/scripts/types/noteType";
import { supabaseUtil } from "@/utils/supabaseUtil";
import { Alert } from "react-native";

export default function useNotes({ personId }: { personId?: number }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [value, setValue] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [noteList, setNoteList] = useState<any[]>([]);
  const [sessionReady, setSessionReady] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [noteUpdate, setNoteUpdate] = useState<any[]>([]);
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
    console.log("Data selecionada:", date);
    setDate(date);
    setInputValue(`${date.toLocaleDateString("pt-BR")}`);
    hideDatePicker();
  };

  function clearFields() {
    setTitle("");
    setDescription("");
    setStatus("");
    setValue("");
    setDate(new Date());
  }

  async function createNote({
    title,
    description,
    status,
    value,
    date,
  }: noteType) {
    try {
      setLoading(true);

      const create = {
        person_id: personId,
        title,
        description,
        status,
        value,
        date: date ? date.toISOString() : null,
        updated_at: new Date(),
      };

      const { error, data } = await supabaseUtil
        .from("notes")
        .insert(create)
        .select("*");

      if (error) {
        console.log("Erro", error);
        throw error;
      }
      if (data) {
        setNoteList((prevList) => [...prevList, ...data]);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function getNotes() {
    if (!personId) return;
    try {
      const { data, error } = await supabaseUtil
        .from("notes")
        .select("*")
        .eq("person_id", personId);

      error ? setNoteList([]) : setNoteList(data || []);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getNoteById({ id }: { id: number }) {
    try {
      const { error, data } = await supabaseUtil
        .from("notes")
        .select("*")
        .eq("id", id);

      if (error) {
        console.log(error);
      }

      setNoteUpdate(data || []);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function updateNote({
    id,
    title,
    description,
    status,
    value,
    date,
  }: noteType) {
    try {
      const updateData = {
        title,
        description,
        status,
        value,
        date,
        update_at: new Date(),
      };

      const { error, data } = await supabaseUtil
        .from("notes")
        .update(updateData)
        .eq("id", id);

      if (error) {
        console.log(error);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function deleteNote({ id }: { id: number }) {
    try {
      const { error } = await supabaseUtil.from("notes").delete().eq("id", id);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  useEffect(() => {
    if (personId) {
      setSessionReady(true);
    }
  }, [personId]);

  useEffect(() => {
    if (sessionReady) {
      getNotes();
    }
  }, [sessionReady]);

  useEffect(() => {
    setNoteList(noteList);
    getNotes();
  }, [noteList]);

  return {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    noteList,
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
    noteUpdate,
    clearFields,
    handleConfirm,
    hideDatePicker,
    formatValueForDatabase,
  };
}
