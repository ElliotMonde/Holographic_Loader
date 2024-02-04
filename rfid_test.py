import rdm6300

reader = rdm6300.Reader('/dev/tty50')
print("Please insert an RfID card")
while True:
    card = reader.read()
    if card:
        print(f"[{card.value}] raed card {card}")
        