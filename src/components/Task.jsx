import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export function Task({ task, handleDeleteTask }) {
  const onDeleteClick = () => {
    handleDeleteTask(task.id);
  };
  return (
    <Box
      w={['100%', '100%', '220px']}
      p={2}
      bg="blue.100"
      borderRadius="md"
      mb={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      wordBreak="break-word"
    >
      <Flex flexDirection="column">
        <Text>{task.content}</Text>
        <Text fontSize="sm" color="gray.600">
          {task.date}
        </Text>
      </Flex>
      <IconButton
        icon={<DeleteIcon />}
        variant="ghost"
        size="sm"
        onClick={onDeleteClick}
        aria-label="Delete Task"
      />
    </Box>
  );
}