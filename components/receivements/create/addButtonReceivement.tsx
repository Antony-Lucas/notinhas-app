import { Button, ButtonText } from "@/components/ui/button";
import { useReceivementContext } from "@/context/receivement/receivementContext";

export default function AddButtonReceivement() {
  const { toggleMenuReceivements } = useReceivementContext();
  return (
    <Button
      className="w-full h-14 rounded-full"
      onPress={toggleMenuReceivements}
    >
      <ButtonText>Adicionar baixa</ButtonText>
    </Button>
  );
}
