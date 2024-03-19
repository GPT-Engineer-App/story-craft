import React, { useState } from "react";
import { Box, Heading, Text, Textarea, Button, Grid, GridItem, Select, Checkbox, useColorModeValue } from "@chakra-ui/react";
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl } from "react-icons/fa";

const Index = () => {
  const [chapters, setChapters] = useState([{ title: "", content: "" }]);
  const [characters, setCharacters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [isPublic, setIsPublic] = useState(false);

  const bg = useColorModeValue("gray.100", "gray.700");
  const editorBg = useColorModeValue("white", "gray.800");

  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  const handleAddChapter = () => {
    setChapters([...chapters, { title: "", content: "" }]);
    setSelectedChapter(chapters.length);
  };

  const handleCharacterChange = (event) => {
    setCharacters(event.target.value.split(",").map((c) => c.trim()));
  };

  return (
    <Box p={8} bg={bg} minH="100vh">
      <Grid templateColumns="1fr 3fr" gap={8}>
        <GridItem>
          <Heading size="lg" mb={4}>
            Chapters
          </Heading>
          {chapters.map((chapter, index) => (
            <Button key={index} onClick={() => setSelectedChapter(index)} variant="ghost" w="100%" justifyContent="flex-start" mb={2}>
              {chapter.title || `Chapter ${index + 1}`}
            </Button>
          ))}
          <Button onClick={handleAddChapter} colorScheme="blue" mt={4}>
            Add Chapter
          </Button>

          <Heading size="lg" mt={8} mb={4}>
            Characters
          </Heading>
          <Textarea value={characters.join(", ")} onChange={handleCharacterChange} placeholder="Separate characters with commas" />

          <Checkbox mt={4} isChecked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}>
            Make story public
          </Checkbox>
        </GridItem>

        <GridItem>
          <Heading size="xl" mb={4}>
            {chapters[selectedChapter].title || `Chapter ${selectedChapter + 1}`}
          </Heading>
          <Box mb={4}>
            <Select placeholder="Font" mb={2}>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
            </Select>
            <Button mr={2}>
              <FaBold />
            </Button>
            <Button mr={2}>
              <FaItalic />
            </Button>
            <Button mr={2}>
              <FaUnderline />
            </Button>
            <Button mr={2}>
              <FaListUl />
            </Button>
            <Button>
              <FaListOl />
            </Button>
          </Box>
          <Textarea value={chapters[selectedChapter].content} onChange={(e) => handleChapterChange(selectedChapter, "content", e.target.value)} minH="60vh" bg={editorBg} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Index;
