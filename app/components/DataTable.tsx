import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const TableView = ({ total_reviews }: any) => {
  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.title}</Text>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>{item.price}</Text>
      <Text style={styles.cell}>{item.description}</Text>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.cell}>{item.username}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.comment}</Text>
      <Text style={styles.cell}>{item.label}</Text>
      <Text style={styles.cell}>{item.score}</Text>
    </View>
  );

  const rows = total_reviews.map((review: any) => ({
    id: review._id.toString(),
    title: review.productId.title,
    category: review.productId.category,
    price: review.productId.price,
    description: review.productId.description || "No description",
    thumbnail: review.productId.thumbnail,
    username: review.userId.username,
    email: review.userId.email,
    comment: review.comment,
    label: review.result.label,
    score: parseFloat(review.result.score),
  }));

  return (
    <ScrollView horizontal>
      <FlatList
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Product Name</Text>
            <Text style={styles.headerCell}>Category</Text>
            <Text style={styles.headerCell}>Price</Text>
            <Text style={styles.headerCell}>Description</Text>
            <Text style={styles.headerCell}>Thumbnail</Text>
            <Text style={styles.headerCell}>Username</Text>
            <Text style={styles.headerCell}>Email</Text>
            <Text style={styles.headerCell}>Review</Text>
            <Text style={styles.headerCell}>Sentiment Label</Text>
            <Text style={styles.headerCell}>Score</Text>
          </View>
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#1976D2", 
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    width: 150, 
    textAlign: "center", 
    fontSize: 16,
    color: "#fff", 
    fontWeight: "bold",
    paddingVertical: 12, 
    justifyContent: "center", 
    borderWidth: 1, 
    borderColor: "#fff", 
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1, 
    borderBottomColor: "#ddd", 
    width: "100%",
  },
  cell: {
    width: 150, 
    textAlign: "center", 
    fontSize: 14,
    color: "#333",
    paddingVertical: 12, 
    lineHeight: 20,
    justifyContent: "center", 
    borderWidth: 1, 
    borderColor: "#ddd", 
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default TableView;
