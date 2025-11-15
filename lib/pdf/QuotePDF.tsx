import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
  },
  header: {
    marginBottom: 30,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a1a1a',
  },
  companyTagline: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
    borderBottomWidth: 2,
    borderBottomColor: '#d97706',
    borderBottomStyle: 'solid',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: '30%',
    color: '#666',
    fontSize: 10,
  },
  value: {
    width: '70%',
    color: '#1a1a1a',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 8,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    borderBottomStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
  },
  tableCol1: {
    width: '40%',
  },
  tableCol2: {
    width: '15%',
    textAlign: 'center',
  },
  tableCol3: {
    width: '20%',
    textAlign: 'right',
  },
  tableCol4: {
    width: '25%',
    textAlign: 'right',
  },
  itemDetails: {
    fontSize: 9,
    color: '#666',
    marginTop: 4,
    marginLeft: 10,
  },
  totalSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#1a1a1a',
    borderTopStyle: 'solid',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  totalLabel: {
    width: '30%',
    textAlign: 'right',
    marginRight: 20,
    fontSize: 12,
  },
  totalValue: {
    width: '20%',
    textAlign: 'right',
    fontSize: 12,
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    borderTopStyle: 'solid',
  },
  grandTotalLabel: {
    width: '30%',
    textAlign: 'right',
    marginRight: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  grandTotalValue: {
    width: '20%',
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d97706',
  },
  notes: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fef3c7',
    borderRadius: 5,
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notesText: {
    fontSize: 10,
    color: '#666',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#666',
    fontSize: 9,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
});

interface QuoteItem {
  product: {
    name: string;
    price: number;
    promoPrice?: number;
    category: {
      name: string;
    };
  };
  quantity: number;
  bedSize?: string;
  design?: string;
  setType?: string;
  specialNotes?: string;
}

interface QuotePDFProps {
  quote: {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress?: string;
    items: QuoteItem[];
    notes?: string;
    createdAt: string;
  };
  totalAmount: number;
}

export const QuotePDF: React.FC<QuotePDFProps> = ({ quote, totalAmount }) => {
  const calculateItemTotal = (item: QuoteItem) => {
    const price = item.product.promoPrice || item.product.price;
    return price * item.quantity;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>JD Beddings & Interiors</Text>
          <Text style={styles.companyTagline}>
            Creating soft, beautiful, and timeless spaces
          </Text>
          <Text style={styles.title}>QUOTATION</Text>
          <Text style={{ fontSize: 10, color: '#666' }}>
            Quote #: {quote.id.substring(0, 8).toUpperCase()}
          </Text>
          <Text style={{ fontSize: 10, color: '#666' }}>
            Date: {formatDate(quote.createdAt)}
          </Text>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{quote.customerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{quote.customerEmail}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{quote.customerPhone}</Text>
          </View>
          {quote.customerAddress && (
            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{quote.customerAddress}</Text>
            </View>
          )}
        </View>

        {/* Items Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quoted Items</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCol1}>Item Description</Text>
              <Text style={styles.tableCol2}>Qty</Text>
              <Text style={styles.tableCol3}>Unit Price</Text>
              <Text style={styles.tableCol4}>Total</Text>
            </View>
            {quote.items.map((item, index) => (
              <View key={index}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text>{item.product.name}</Text>
                    <Text style={{ fontSize: 9, color: '#666', marginTop: 2 }}>
                      {item.product.category.name}
                    </Text>
                  </View>
                  <Text style={styles.tableCol2}>{item.quantity}</Text>
                  <Text style={styles.tableCol3}>
                    ${(item.product.promoPrice || item.product.price).toFixed(2)}
                    {item.product.promoPrice && (
                      <Text style={{ fontSize: 8, color: '#dc2626', marginLeft: 4 }}>
                        {' '}(SALE)
                      </Text>
                    )}
                  </Text>
                  <Text style={styles.tableCol4}>
                    ${calculateItemTotal(item).toFixed(2)}
                  </Text>
                </View>
                {(item.bedSize || item.design || item.setType || item.specialNotes) && (
                  <View style={styles.itemDetails}>
                    {item.bedSize && <Text>Size: {item.bedSize}</Text>}
                    {item.design && <Text>Design: {item.design}</Text>}
                    {item.setType && <Text>Type: {item.setType}</Text>}
                    {item.specialNotes && <Text>Notes: {item.specialNotes}</Text>}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>TOTAL AMOUNT:</Text>
            <Text style={styles.grandTotalValue}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Notes */}
        {quote.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesTitle}>Additional Notes:</Text>
            <Text style={styles.notesText}>{quote.notes}</Text>
          </View>
        )}

        {/* Terms */}
        <View style={{ marginTop: 30, fontSize: 9, color: '#666' }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Terms & Conditions:</Text>
          <Text>• This quote is valid for 30 days from the date of issue.</Text>
          <Text>• Prices are subject to change based on material availability.</Text>
          <Text>• Custom orders may require a 50% deposit.</Text>
          <Text>• Delivery charges may apply based on location.</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for considering JD Beddings & Interiors</Text>
          <Text>Contact us: info@jdbeddings.com | www.jdbeddings.com</Text>
          <Text style={{ marginTop: 5 }}>
            © {new Date().getFullYear()} JD Beddings & Interiors. All rights reserved.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
