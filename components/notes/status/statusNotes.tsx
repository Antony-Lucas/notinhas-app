import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import useNotes from "@/hooks/notes/useNotes";
import { noteStatus } from "@/scripts/enums/noteEnums";

export default function StatusNotes({
  status,
  setStatus,
}: {
  status: string;
  setStatus: any;
}) {
  const statuses = Object.values(noteStatus);

  return (
    <ThemedView className="flex flex-row gap-2">
      {statuses.map((stat) => (
        <Button
          key={stat}
          variant="outline"
          className={` ${status === stat ? "bg-red-500 text-white" : ""}`}
          onPress={() => {
            setStatus(stat);
          }}
        >
          <ButtonText>{stat}</ButtonText>
        </Button>
      ))}
    </ThemedView>
  );
}
