import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import bibliaDataRV1960 from "./RV1960.json";
import bibliaDataNVI from "./NVI.json";
import bibliaDataNTV from "./NTV.json";

const Biblia = () => {
  const nombresLibros = [
    "Génesis",
    "Éxodo",
    "Levítico",
    "Números",
    "Deuteronomio",
    "Josué",
    "Jueces",
    "Rut",
    "1 Samuel",
    "2 Samuel",
    "1 Reyes",
    "2 Reyes",
    "1 Crónicas",
    "2 Crónicas",
    "Esdras",
    "Nehemías",
    "Ester",
    "Job",
    "Salmos",
    "Proverbios",
    "Eclesiastés",
    "Cantares",
    "Isaías",
    "Jeremías",
    "Lamentaciones",
    "Ezequiel",
    "Daniel",
    "Oseas",
    "Joel",
    "Amós",
    "Abdías",
    "Jonás",
    "Miqueas",
    "Nahúm",
    "Habacuc",
    "Sofonías",
    "Hageo",
    "Zacarías",
    "Malaquías",
    "Mateo",
    "Marcos",
    "Lucas",
    "Juan",
    "Hechos",
    "Romanos",
    "1 Corintios",
    "2 Corintios",
    "Gálatas",
    "Efesios",
    "Filipenses",
    "Colosenses",
    "1 Tesalonicenses",
    "2 Tesalonicenses",
    "1 Timoteo",
    "2 Timoteo",
    "Tito",
    "Filemón",
    "Hebreos",
    "Santiago",
    "1 Pedro",
    "2 Pedro",
    "1 Juan",
    "2 Juan",
    "3 Juan",
    "Judas",
    "Apocalipsis",
  ];

  const [selectedFilters, setSelectedFilters] = useState({
    version: "RV1960",
    book: 0,
    chapter: 0,
    verse: 0,
  });

  const handleBookChange = (value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      book: value,
      chapter: 0,
      verse: 0,
    }));
  };

  const handleChapterChange = (value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      chapter: value,
      verse: 0,
    }));
  };

  const handlePreviousChapter = () => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      chapter: Math.max(prevFilters.chapter - 1, 0),
      verse: 0,
    }));
  };

  const handleNextChapter = () => {
    const maxChapter =
      bibliaData[selectedFilters.version]?.bible?.b[selectedFilters.book]?.c
        .length || 0;
    const nextChapter = Math.min(selectedFilters.chapter + 1, maxChapter - 1);

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      chapter: nextChapter,
      verse: 0,
    }));

    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const handleVersionChange = (value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      version: value,
    }));
  };

  useEffect(() => {
    const maxChapter =
      bibliaData[selectedFilters.version]?.bible?.b[selectedFilters.book]?.c
        .length || 0;
    if (selectedFilters.chapter >= maxChapter) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        chapter: maxChapter - 1,
      }));
    }
  }, [selectedFilters.book, selectedFilters.chapter, selectedFilters.version]);

  const scrollViewRef = useRef();

  const bibliaData = {
    RV1960: bibliaDataRV1960,
    NVI: bibliaDataNVI,
    NTV: bibliaDataNTV,
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
    >
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={handlePreviousChapter}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>

        <Picker
          selectedValue={selectedFilters.version}
          onValueChange={handleVersionChange}
          style={[styles.picker, { width: 150 }]}
        >
          <Picker.Item
            label="RV1960"
            value="RV1960"
          />
          <Picker.Item
            label="NVI"
            value="NVI"
          />
          <Picker.Item
            label="NTV"
            value="NTV"
          />
        </Picker>

        <Picker
          selectedValue={selectedFilters.book}
          onValueChange={handleBookChange}
          style={styles.picker}
        >
          {nombresLibros.map((libro, index) => (
            <Picker.Item
              key={index}
              label={libro}
              value={index}
            />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedFilters.chapter}
          onValueChange={handleChapterChange}
          style={styles.picker}
        >
          {Array.from(
            {
              length:
                bibliaData[selectedFilters.version]?.bible?.b[
                  selectedFilters.book
                ]?.c.length || 0,
            },
            (_, index) => index + 1
          ).map((chapter) => (
            <Picker.Item
              key={chapter}
              label={`${chapter}`}
              value={chapter - 1}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.content}>
        <Text style={styles.bookTitle}>{`${
          nombresLibros[selectedFilters.book]
        }`}</Text>
        <View
          key={selectedFilters.chapter + 1}
          style={styles.chapterContainer}
        >
          <Text style={styles.chapterTitle}>
            {Number(selectedFilters.chapter) + 1}
          </Text>

          {Array.isArray(
            bibliaData[selectedFilters.version]?.bible?.b[selectedFilters.book]
              ?.c[selectedFilters.chapter]?.v
          ) &&
            bibliaData[selectedFilters.version]?.bible?.b[
              selectedFilters.book
            ]?.c[selectedFilters.chapter]?.v.map((verse, verseIndex) => (
              <Text
                key={verseIndex + 1}
                style={styles.verse}
              >{`${selectedFilters.verse + verseIndex + 1}. ${verse}`}</Text>
            ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleNextChapter}
          style={[styles.button, styles.nextButton]}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    alignItems: "center",
  },
  picker: {
    width: 120,
    marginHorizontal: 8,
  },
  content: {
    padding: 16,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  chapterContainer: {
    marginLeft: 16,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  verse: {
    fontSize: 14,
    color: "#666",
  },

  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  nextButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

export default Biblia;
