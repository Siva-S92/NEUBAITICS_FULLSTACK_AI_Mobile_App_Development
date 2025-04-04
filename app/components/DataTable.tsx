// import React from "react";
// import { ScrollView, Text, View, StyleSheet } from "react-native";
// import { Table, Row, Rows } from "react-native-table-component";

// export default function DataGridDemo({total_reviews}: any) {
//   // Prepare the rows by mapping and flattening the review data
//   const rows = total_reviews.map((review: any) => [
//     review._id.toString(),
//     review.productId.title,
//     review.productId.category,
//     review.productId.price,
//     review.productId.description || "No description", // Add description if available
//     review.productId.thumbnail,
//     review.userId.username,
//     review.userId.email,
//     review.comment,
//     review.result.label,
//     parseFloat(review.result.score).toFixed(2), // Format the score
//   ]);

//   const tableHead = [
//     "ID",
//     "Product Name",
//     "Category",
//     "Price",
//     "Description",
//     "Thumbnail",
//     "Username",
//     "Email",
//     "Review",
//     "Sentiment Label",
//     "Score",
//   ];

//   return (
//     <ScrollView horizontal>
//       <View style={styles.container}>
//         <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
//           <Row data={tableHead} style={styles.head} textStyle={styles.text} />
//           <Rows data={rows} textStyle={styles.text} />
//         </Table>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//   },
//   head: { height: 40, backgroundColor: "#f1f8ff" },
//   text: { textAlign: "center", padding: 5 },
// });

// ##################################################################################################



// import React from "react";
// import { View, Text, FlatList, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
// import { Card } from "react-native-paper";

// const TableView = ({ total_reviews }: any) => {
//   const renderItem = ({ item }: any) => (
//     <View style={styles.row}>
//       <Text style={styles.cell}>{item.id}</Text>
//       <Text style={styles.cell}>{item.title}</Text>
//       <Text style={styles.cell}>{item.category}</Text>
//       <Text style={styles.cell}>{item.price}</Text>
//       <Text style={styles.cell}>{item.description}</Text>
//       <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
//       <Text style={styles.cell}>{item.username}</Text>
//       <Text style={styles.cell}>{item.email}</Text>
//       <Text style={styles.cell}>{item.comment}</Text>
//       <Text style={styles.cell}>{item.label}</Text>
//       <Text style={styles.cell}>{item.score}</Text>
//     </View>
//   );

//   const rows = total_reviews.map((review: any) => ({
//     id: review._id.toString(),
//     title: review.productId.title,
//     category: review.productId.category,
//     price: review.productId.price,
//     description: review.productId.description || "No description",
//     thumbnail: review.productId.thumbnail,
//     username: review.userId.username,
//     email: review.userId.email,
//     comment: review.comment,
//     label: review.result.label,
//     score: parseFloat(review.result.score),
//   }));

//   return (
//     <ScrollView horizontal>
//       <FlatList
//         data={rows}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         ListHeaderComponent={
//           <View style={styles.header}>
//             <Text style={styles.headerCell}>ID</Text>
//             <Text style={styles.headerCell}>Product Name</Text>
//             <Text style={styles.headerCell}>Category</Text>
//             <Text style={styles.headerCell}>Price</Text>
//             <Text style={styles.headerCell}>Description</Text>
//             <Text style={styles.headerCell}>Thumbnail</Text>
//             <Text style={styles.headerCell}>Username</Text>
//             <Text style={styles.headerCell}>Email</Text>
//             <Text style={styles.headerCell}>Review</Text>
//             <Text style={styles.headerCell}>Sentiment Label</Text>
//             <Text style={styles.headerCell}>Score</Text>
//           </View>
//         }
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     backgroundColor: "#f4f4f4",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     justifyContent: "space-between",
//   },
//   headerCell: {
//     flex: 1,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontSize: 14,
//     color: "#555",
//   },
//   row: {
//     flexDirection: "row",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     justifyContent: "space-between",
//   },
//   cell: {
//     flex: 1,
//     textAlign: "center",
//     fontSize: 14,
//     color: "#333",
//     padding: 5,
//   },
//   thumbnail: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginLeft: 5,
//   },
// });

// export default TableView;



//#####################################################################




import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, Image, Dimensions } from "react-native";


const TableView = ({ total_reviews }: any) => {
  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.id]}>{item.id}</Text>
      <Text style={[styles.cell, styles.title]}>{item.title}</Text>
      <Text style={[styles.cell, styles.category]}>{item.category}</Text>
      <Text style={[styles.cell, styles.price]}>{item.price}</Text>
      <Text style={[styles.cell, styles.description]}>{item.description}</Text>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={[styles.cell, styles.username]}>{item.username}</Text>
      <Text style={[styles.cell, styles.email]}>{item.email}</Text>
      <Text style={[styles.cell, styles.comment]}>{item.comment}</Text>
      <Text style={[styles.cell, styles.label]}>{item.label}</Text>
      <Text style={[styles.cell, styles.score]}>{item.score}</Text>
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
        ListFooterComponent={<View style={styles.footer} />}
        contentContainerStyle={styles.contentContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
    position: "sticky",  // Keeps header sticky at the top when scrolling
    top: 0,  // Ensures it stays at the top
    zIndex: 1,  // Ensures header is above the rows
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    color: "#555",
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
    height: 60, // Fixed row height for consistency
  },
  cell: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    padding: 5,
    overflow: "hidden", // In case text overflows
  },
  id: {
    width: 50,
  },
  title: {
    width: 150,
  },
  category: {
    width: 120,
  },
  price: {
    width: 80,
  },
  description: {
    width: 200, // Adjust for longer descriptions
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
  },
  username: {
    width: 120,
  },
  email: {
    width: 150,
  },
  comment: {
    width: 200,
  },
  label: {
    width: 120,
  },
  score: {
    width: 80,
  },
  footer: {
    height: 20,  // For footer space
  },
  contentContainer: {
    paddingBottom: 20, // Padding for the bottom to avoid row cutoff
  }
});

export default TableView;









