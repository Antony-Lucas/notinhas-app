import { personType } from "@/scripts/types/personType";
import React, { useEffect, useState } from "react";
import useCurrentSession from "../auth/currentSession";
import { supabaseUtil } from "@/utils/supabaseUtil";
import { Alert } from "react-native";

export default function usePerson() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [adress, setAdress] = useState("");
  const [observation, setObservation] = useState("");
  const [personList, setPersonList] = useState<any[]>([]);
  const [personDataUpdate, setPersonDataUpdate] = useState<any[]>([]);
  const [sessionReady, setSessionReady] = useState(false);

  const session = useCurrentSession();

  function clearPersonFields() {
    setName("");
    setContact("");
    setAdress("");
    setObservation("");
  }

  async function createPerson({
    name,
    adress,
    contact,
    observation,
  }: personType) {
    try {
      setLoading(true);

      const create = {
        user_id: session?.user.id,
        name,
        contact,
        adress,
        observation,
        updated_at: new Date(),
      };

      const { error, data } = await supabaseUtil
        .from("person")
        .insert(create)
        .select("*");

      if (error) {
        console.log("Erro", error);
        throw error;
      }
      if (data) {
        setPersonList((prevList) => [...prevList, ...data]);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      clearPersonFields();
      setLoading(false);
    }
  }

  async function getPersons() {
    if (!session?.user?.id) return;
    try {
      const { data, error } = await supabaseUtil
        .from("person")
        .select("*")
        .eq("user_id", session?.user.id);

      error ? setPersonList([]) : setPersonList(data || []);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getPersonById({ id }: { id: string }) {
    try {
      const { data, error } = await supabaseUtil
        .from("person")
        .select("*")
        .eq("id", id);

      if (error) {
        setPersonDataUpdate([]);
        console.log(error);
        return;
      }

      setPersonDataUpdate(data || []);
      console.log(personDataUpdate);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function updatePerson({
    id,
    name,
    contact,
    adress,
    observation,
  }: personType) {
    try {
      const update = {
        name: name,
        contact: contact,
        adress: adress,
        observation: observation,
      };

      const { error, data } = await supabaseUtil
        .from("person")
        .update(update)
        .eq("id", id);

      if (error) {
        console.error("Erro ao atualizar dados:", error);
        return null;
      }

      console.log("Dados atualizados com sucesso:", data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePerson({ id }: { id: string }) {
    try {
      const { error, data } = await supabaseUtil
        .from("person")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Erro ao deletar o registro:", error.message);
        Alert.alert("Erro", "Não foi possível deletar o registro.");
      } else {
        console.log("Registro deletado com sucesso:", data);
        Alert.alert("Sucesso", "Registro deletado com sucesso.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (session?.user.id) {
      setSessionReady(true);
    }
  }, [session?.user.id]);

  useEffect(() => {
    if (sessionReady) {
      getPersons();
    }
  }, [sessionReady]);

  useEffect(() => {
    setPersonList(personList);
    getPersons();
  }, [personList]);

  return {
    deletePerson,
    updatePerson,
    createPerson,
    getPersons,
    getPersonById,
    clearPersonFields,
    personDataUpdate,
    name,
    setName,
    adress,
    setAdress,
    contact,
    setContact,
    observation,
    setObservation,
    personList,
  };
}
