import { personType } from "@/scripts/types/personType";
import { useEffect, useState } from "react";
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

      console.log(create);

      const { error } = await supabaseUtil.from("person").insert(create);

      if (error) {
        console.log("Erro", error);
        throw error;
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
    try {
      const { data, error } = await supabaseUtil
        .from("person")
        .select("*")
        .eq("user_id", session?.user.id);

      error ? setPersonList([]) : setPersonList(data || []);
      console.log(personList);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    getPersons();
  }, [session?.user.id]);

  return {
    createPerson,
    name,
    setName,
    adress,
    setAdress,
    contact,
    setContact,
    observation,
    setObservation,
    clearPersonFields,
    personList,
  };
}
