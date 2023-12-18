import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import bibliaData from "./RV1960.json";

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

  const [selectedBook, setSelectedBook] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState(0); // Nuevo estado para el versículo

  const handleBookChange = (value) => {
    setSelectedBook(value);
    setSelectedChapter(0);
    setSelectedVerse(0);
  };

  const handleChapterChange = (value) => {
    setSelectedChapter(value);
    setSelectedVerse(0); // Al cambiar el capítulo, establecer el versículo en 1
  };

  const handlePreviousChapter = () => {
    setSelectedChapter((prevChapter) => Math.max(prevChapter - 1, 0));
    setSelectedVerse(0); // Al cambiar el capítulo, establecer el versículo en 1
  };

  const scrollViewRef = useRef();

  const handleNextChapter = () => {
    const maxChapter = bibliaData?.bible?.b[selectedBook]?.c.length || 0;
    setSelectedChapter((prevChapter) =>
      Math.min(prevChapter + 1, maxChapter - 1)
    );
    setSelectedVerse(0);

    // Scroll al principio del ScrollView
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  useEffect(() => {
    const maxChapter = bibliaData?.bible?.b[selectedBook]?.c.length || 0;
    if (selectedChapter >= maxChapter) {
      setSelectedChapter(maxChapter - 1);
    }
  }, [selectedBook, selectedChapter]);

  return (
    <ScrollView
      ref={scrollViewRef} // Referencia del ScrollView
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
          selectedValue={selectedBook}
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
          selectedValue={selectedChapter}
          onValueChange={handleChapterChange}
          style={styles.picker}
        >
          {Array.from(
            { length: bibliaData?.bible?.b[selectedBook]?.c.length || 0 },
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
        <Text style={styles.bookTitle}>{`${nombresLibros[selectedBook]}`}</Text>
        <View
          key={selectedChapter + 1}
          style={styles.chapterContainer}
        >
          <Text style={styles.chapterTitle}>{Number(selectedChapter) + 1}</Text>

          {Array.isArray(
            bibliaData?.bible?.b[selectedBook]?.c[selectedChapter]?.v
          ) &&
            bibliaData?.bible?.b[selectedBook]?.c[selectedChapter]?.v.map(
              (verse, verseIndex) => (
                <Text
                  key={verseIndex + 1}
                  style={styles.verse}
                >{`${selectedVerse + verseIndex + 1}. ${verse}`}</Text>
              )
            )}
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
