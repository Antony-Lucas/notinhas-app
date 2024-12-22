import { useEffect, useState } from "react";

export default function useModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return { modalVisible, setModalVisible };
}
