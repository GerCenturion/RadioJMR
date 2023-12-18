import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {bibliaData?.bible?.b.map((book, bookIndex) => (
          <View
            key={bookIndex + 1}
            style={styles.bookContainer}
          >
            <Text style={styles.bookTitle}>{`${
              nombresLibros[bookIndex] || "Nombre no disponible"
            }`}</Text>
            {Array.isArray(book?.c) &&
              book?.c.map((chapter, chapterIndex) => (
                <View
                  key={chapterIndex + 1}
                  style={styles.chapterContainer}
                >
                  <Text style={styles.chapterTitle}>{`${
                    chapterIndex + 1
                  }`}</Text>
                  {Array.isArray(chapter?.v) &&
                    chapter?.v.map((verse, verseIndex) => (
                      <Text
                        key={verseIndex + 1}
                        style={styles.verse}
                      >{`${verseIndex + 1}. ${verse}`}</Text>
                    ))}
                </View>
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Color de fondo de toda la pantalla
  },
  content: {
    padding: 16,
  },
  bookContainer: {
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Color del texto del nombre del libro
  },
  chapterContainer: {
    marginLeft: 16,
    padding: 10,
    backgroundColor: "#fff", // Color de fondo de la sección del capítulo
    borderRadius: 8,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555", // Color del texto del título del capítulo
  },
  verse: {
    fontSize: 14,
    color: "#666", // Color del texto del versículo
  },
});

export default Biblia;
