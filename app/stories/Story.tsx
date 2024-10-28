import { Paper, Text, Title, Button } from "@mantine/core";
import classes from "./story.module.css";

export function Story() {
  return (
    <Paper shadow="md" p="xl" radius="md" className={classes.card}>
      <div>
        <Text className={classes.category} size="xs">
          nature
        </Text>
        <Title order={3} className={classes.title}>
          Best forests to visit in North America
        </Title>
      </div>
      <Button variant="white" color="dark">
        My First Story
      </Button>
    </Paper>
  );
}
