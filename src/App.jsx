import React from 'react';
import { Box, Flex,Button } from '@chakra-ui/react';
import { Column } from './components/Column';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { reorderColumnTasks } from './redux/slices/ColumnSlice';
import {useTheme } from './assets/ThemeContext';
function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const columns = useSelector((state) => state.column.columns);
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (
      !destination ||
      !source ||
      !source.droppableId ||
      !destination.droppableId
    ) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    dispatch(reorderColumnTasks({ source, destination }));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box minHeight={'100vh'} overflow={'hidden'} p={5}  bg={isDarkMode ? 'gray.700' : 'gray.200'}
  color={isDarkMode ? 'white' : 'black'}>
      <Button onClick={toggleTheme}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </Button>
        <Flex
          w={['100%', '100%', '100%', '100%']}
          direction={['column', 'column', 'row', 'row']}
          justify={['center', 'center', 'space-between', 'space-between']}
          align="center"
          p={4}
          borderRadius="md"
          bg="blackAlpha.600"
          margin="auto"
          flexWrap="wrap"
        >
          {Object.keys(columns).map((columnId) => {
            const column = columns[columnId];
            const tasksForColumn = column.taskIds.map(
              (taskId) => tasks[taskId],
            );
            return (
              <Column column={column} tasks={tasksForColumn} key={column.id} />
            );
          })}
        </Flex>
      </Box>
    </DragDropContext>
  );
}

export default App;
