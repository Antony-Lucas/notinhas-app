import { useEffect, useState } from "react";
import { noteType } from "@/scripts/types/noteType";
import { supabaseUtil } from "@/utils/supabaseUtil";
import { Alert } from "react-native";

export default function useNotes({ personId }: { personId: number }) {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(<Date | null>new Date());
  const [noteList, setNoteList] = useState<any[]>([]);
  const [sessionReady, setSessionReady] = useState(false);

  async function createNote({ description, value, date }: noteType) {
    try {
      setLoading(true);

      const create = {
        person_id: personId,
        description,
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
    createNote,
    noteList,
    setDescription,
    description,
    setValue,
    value,
    setDate,
    date,
  };
}
