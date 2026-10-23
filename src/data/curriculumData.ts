import { CurricularWeek, Question, PracticeSession } from '../types';

export const CURRICULAR_WEEKS: CurricularWeek[] = [
  {
    week: 1,
    weekCode: 'Week 01',
    title: 'Fundamentals & Packet Switching',
    description: 'Network edges, statistical multiplexing, queuing delays, transmission rates and circuit switching fundamentals.',
    questionCount: 10,
    bestScore: 90,
    topics: ['Statistical Multiplexing', 'Transmission Delay', 'Propagation Delay', 'Packet vs Circuit Switching', 'Queuing Models']
  },
  {
    week: 2,
    weekCode: 'Week 02',
    title: 'OSI & Layer Architecture',
    description: 'Layering abstractions, encapsulation, OSI 7-layer vs TCP/IP stack, and protocol data units.',
    questionCount: 10,
    bestScore: 100,
    topics: ['OSI 7-Layer Model', 'TCP/IP 5-Layer Stack', 'Encapsulation Headers', 'Service Data Units', 'Layer Boundaries']
  },
  {
    week: 3,
    weekCode: 'Week 03',
    title: 'HTTP/1.1 & DNS Resolution',
    description: 'Persistent connections, cookies, web caching, iterative vs recursive DNS queries, and resource records.',
    questionCount: 10,
    bestScore: 80,
    topics: ['HTTP/1.1 Pipelining', 'DNS Recursive vs Iterative', 'Resource Records (A, CNAME, MX)', 'Conditional GET', 'Web Caching']
  },
  {
    week: 4,
    weekCode: 'Week 04',
    title: 'P2P, HTTP/2 & CDN Overlays',
    description: 'BitTorrent tit-for-tat distribution, HTTP/2 framing, head-of-line blocking, and edge server redirection.',
    questionCount: 10,
    topics: ['BitTorrent Choking Algorithm', 'HTTP/2 Binary Framing', 'HOL Blocking at Transport vs App Layer', 'CDN DNS Anycast', 'QUIC Basics']
  },
  {
    week: 5,
    weekCode: 'Week 05',
    title: 'Transport Layer & Sockets',
    description: 'Multiplexing/demultiplexing, port numbers, UDP connectionless delivery, and BSD socket programming.',
    questionCount: 10,
    topics: ['Port Demultiplexing', 'UDP Checksum 1s Complement', 'BSD Socket API', 'Connection-Oriented Demux', 'Well-Known Ports']
  },
  {
    week: 6,
    weekCode: 'Week 06',
    title: 'RDT & Go-Back-N / Selective Repeat',
    description: 'Reliable data transfer state machines, timer handling, window sizing constraints, and cumulative ACKs.',
    questionCount: 10,
    topics: ['RDT 3.0 State Machine', 'Go-Back-N Cumulative ACK', 'Selective Repeat Window Sizing', 'Sequence Number Wraparound', 'Timer Management']
  },
  {
    week: 7,
    weekCode: 'Week 07',
    title: 'TCP Flow & Congestion Control',
    description: 'Slow Start, AIMD, Fast Retransmit, Fast Recovery, Tahoe vs Reno dynamics, and cubic congestion.',
    questionCount: 10,
    topics: ['Slow Start cwnd Doubling', 'AIMD Linear Growth', 'Fast Retransmit Triple Duplicate ACKs', 'Tahoe vs Reno Fast Recovery', 'TCP Header Flags']
  },
  {
    week: 8,
    weekCode: 'Week 08',
    title: 'IP Forwarding, CIDR & TCAM',
    description: 'IPv4 datagram structure, Longest Prefix Matching, hardware lookup architectures, and NAT tables.',
    questionCount: 10,
    topics: ['IPv4 Header Checksum', 'Longest Prefix Match (LPM)', 'CIDR Subnetting & Masking', 'TCAM Hardware Lookup', 'NAT Traversal & Port Mapping']
  },
  {
    week: 9,
    weekCode: 'Week 09',
    title: 'Distance Vector & Link State',
    description: 'Bellman-Ford equation, count-to-infinity mitigation, poisoned reverse, and Dijkstra OSPF SPF computation.',
    questionCount: 10,
    topics: ['Bellman-Ford Equations', 'Count to Infinity Mitigation', 'Poisoned Reverse', 'Dijkstra Shortest Path First', 'OSPF LSA Flooding']
  },
  {
    week: 10,
    weekCode: 'Week 10',
    title: 'BGP, AS Policy & ICMPv6',
    description: 'Inter-domain routing, eBGP/iBGP peerings, AS-PATH attributes, policy filtering, and NDP neighbor solicitation.',
    questionCount: 10,
    topics: ['eBGP vs iBGP', 'AS-PATH Loop Avoidance', 'NEXT-HOP Attribute', 'ICMPv6 Neighbor Discovery Protocol', 'Autonomous System Policies']
  },
  {
    week: 11,
    weekCode: 'Week 11',
    title: 'Link Layer, MAC & CSMA/CD',
    description: 'Error detection parity/CRC, random access protocols, binary exponential backoff, and collision domains.',
    questionCount: 10,
    topics: ['CRC Generator Polynomials', 'CSMA/CD Slot Time & Min Frame Size', 'Binary Exponential Backoff', 'Collision Domains', 'Slotted ALOHA Efficiency']
  },
  {
    week: 12,
    weekCode: 'Week 12',
    title: 'Ethernet, ARP & VLANs',
    description: 'Switch forwarding tables, ARP broadcast resolution, 802.1Q trunking tags, and spanning tree protocol.',
    questionCount: 10,
    topics: ['Self-Learning Switch Tables', 'ARP Cache & Broadcast Queries', 'IEEE 802.1Q VLAN Tagging', 'Spanning Tree Protocol (STP)', 'Broadcast Storms']
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // --- WEEK 1: Fundamentals & Packet Switching ---
  {
    id: 'w1-q1',
    week: 1,
    weekTitle: 'Fundamentals & Packet Switching',
    topic: 'Transmission vs Propagation Delay',
    question: 'A host sends a packet of size L = 12,000 bits over a link of length d = 2,500 km with transmission rate R = 2 Mbps. Propagation speed in the medium is s = 2.5 × 10⁸ m/s. What are the transmission delay (d_trans) and propagation delay (d_prop)?',
    options: [
      'd_trans = 6.0 ms, d_prop = 10.0 ms',
      'd_trans = 10.0 ms, d_prop = 6.0 ms',
      'd_trans = 0.6 ms, d_prop = 1.0 ms',
      'd_trans = 6.0 ms, d_prop = 1.0 ms'
    ],
    correctAnswer: 0,
    explanation: 'Transmission delay d_trans = L / R = 12,000 bits / (2 × 10⁶ bps) = 0.006 s = 6.0 ms. Propagation delay d_prop = d / s = 2,500,000 m / (2.5 × 10⁸ m/s) = 0.010 s = 10.0 ms.',
    rfcRef: 'Kurose & Ross Chapter 1',
    difficulty: 'Standard'
  },
  {
    id: 'w1-q2',
    week: 1,
    weekTitle: 'Fundamentals & Packet Switching',
    topic: 'Statistical Multiplexing',
    question: 'Why does packet switching support significantly more concurrent active users than circuit switching on a shared link when users are active only 10% of the time?',
    options: [
      'Packet switching allocates dedicated frequency bands using FDM.',
      'Statistical multiplexing exploits the low probability that all users transmit simultaneously, allowing link sharing on demand.',
      'Packet switching eliminates all queuing delays at intermediate routers.',
      'Packet switching guarantees zero packet loss under heavy load.'
    ],
    correctAnswer: 1,
    explanation: 'When user traffic is bursty, circuit switching reserves dedicated capacity that sits idle 90% of the time. Statistical multiplexing dynamically allocates link capacity only when packets are ready to transmit, leveraging the binomial distribution to allow high statistical multiplexing gain.',
    rfcRef: 'Kleinrock Queuing Systems',
    difficulty: 'Standard'
  },
  {
    id: 'w1-q3',
    week: 1,
    weekTitle: 'Fundamentals & Packet Switching',
    topic: 'Queuing Delay & Traffic Intensity',
    question: 'In an M/M/1 queuing model at a packet switch output port with arrival rate a (packets/s), packet length L (bits), and transmission rate R (bps), what happens to average queuing delay as traffic intensity I = (L · a) / R approaches 1?',
    options: [
      'Queuing delay approaches zero because the link is utilized at maximum efficiency.',
      'Queuing delay increases linearly with a slope of 1.',
      'Queuing delay approaches infinity as queue lengths build up without bound.',
      'Queuing delay remains capped at exactly one packet transmission time.'
    ],
    correctAnswer: 2,
    explanation: 'Traffic intensity I = La/R is the ratio of arrival rate to service rate. According to queuing theory, average queuing delay is proportional to I / (1 - I). As I -> 1, the denominator approaches 0, causing the queue length and delay to diverge asymptotically toward infinity.',
    rfcRef: 'Little\'s Law / M/M/1',
    difficulty: 'Advanced'
  },
  {
    id: 'w1-q4',
    week: 1,
    weekTitle: 'Fundamentals & Packet Switching',
    topic: 'Store-and-Forward Delay',
    question: 'Suppose a source sends N packets of size L bits over a path with Q identical links in series, each operating at transmission rate R bps. Neglecting propagation and processing delays, what is the total end-to-end time to deliver all N packets with store-and-forward switching?',
    options: [
      'Total Delay = (Q + N - 1) × (L / R)',
      'Total Delay = (Q × N) × (L / R)',
      'Total Delay = (Q - 1) × (L / R)',
      'Total Delay = (N / Q) × (L / R)'
    ],
    correctAnswer: 0,
    explanation: 'Due to store-and-forward pipelining, the first packet traverses Q links in Q*(L/R) time. Once the pipeline is filled, each of the remaining (N - 1) packets emerges from the last link every (L/R) interval. Hence, total delay = (Q + N - 1) * (L/R).',
    rfcRef: 'Kurose & Ross Section 1.3',
    difficulty: 'Rigorous'
  },
  {
    id: 'w1-q5',
    week: 1,
    weekTitle: 'Fundamentals & Packet Switching',
    topic: 'Circuit Switching FDM vs TDM',
    question: 'Which of the following correctly contrasts Frequency-Division Multiplexing (FDM) and Time-Division Multiplexing (TDM) in circuit-switched networks?',
    options: [
      'FDM divides the time domain into recurring slots, while TDM divides the frequency spectrum into distinct bands.',
      'FDM continuously allocates a narrow frequency band to each call, while TDM allocates the entire frequency spectrum periodically for a dedicated time slot.',
      'Both FDM and TDM use dynamic packet buffers to absorb bursty traffic.',
      'TDM requires analog filters at the receiver, whereas FDM requires precise frame synchronization clocks.'
    ],
    correctAnswer: 1,
    explanation: 'In FDM, the link spectrum is shared in frequency: each connection gets a dedicated narrower band for the call duration. In TDM, time is divided into recurring frames and each connection gets a dedicated periodic slot using the whole link bandwidth during that slot.',
    difficulty: 'Standard'
  },
  {
    id: 'w1-q6',
    week: 1,
    weekTitle: 'Fundamentals & Packet Switching',
    topic: 'Nodal Delay Components',
    question: 'Which component of total nodal delay is independent of link transmission rate R and packet size L?',
    options: [
      'Transmission delay (d_trans)',
      'Propagation delay (d_prop)',
      'Queuing delay (d_queue)',
      'Packet assembly delay'
    ],
    correctAnswer: 1,
    explanation: 'Propagation delay d_prop = d / s depends exclusively on the physical distance d and propagation speed s in the medium (~2-3 × 10⁸ m/s). It is independent of transmission rate R and packet size L.',
    difficulty: 'Standard'
  },
  {
    id: 'w1-q7',
    week: 1,
    weekTitle: 'Fundamentals & Packet Switching',
    topic: 'Bandwidth-Delay Product (BDP)',
    question: 'A 10 Gbps link has a round-trip time (RTT) of 80 ms. What is the Bandwidth-Delay Product (BDP) in megabytes (MB)?',
    options: [
      '100 MB',
      '800 MB',
      '12.5 MB',
      '1,000 MB'
    ],
    correctAnswer: 0,
    explanation: 'BDP = Bandwidth × RTT = (10 × 10⁹ bits/sec) × 0.08 sec = 8 × 10⁸ bits. Converting to bytes: (8 × 10⁸ bits) / 8 = 10⁸ bytes = 100 × 10⁶ bytes = 100 MB.',
    difficulty: 'Advanced'
  },
  {
    id: 'w1-q8',
    week: 1,
    weekTitle: 'Fundamentals & Packet Switching',
    topic: 'Traceroute & ICMP TTL',
    question: 'How does the traceroute diagnostic utility determine the sequence of intermediate routers between source and destination?',
    options: [
      'It queries the destination router for its current BGP routing table dump.',
      'It sends probe packets with progressively increasing Time-To-Live (TTL) values (1, 2, 3...) and records the IP addresses of routers that return ICMP Time Exceeded (Type 11) messages.',
      'It leverages RSVP to reserve hop-by-hop bandwidth labels along the forward path.',
      'It inspects the Longest Prefix Match table stored in local client cache.'
    ],
    correctAnswer: 1,
    explanation: 'Traceroute transmits datagrams with TTL=1, 2, 3... When router n receives the packet with TTL=1, it decrements TTL to 0, drops the packet, and sends back an ICMP Type 11 Code 0 (Time-to-Live Exceeded in Transit), revealing its identity to the source.',
    rfcRef: 'RFC 792 ICMP',
    difficulty: 'Standard'
  },
  {
    id: 'w1-q9',
    week: 1,
    weekTitle: 'Fundamentals & Packet Switching',
    topic: 'Throughput Bottlenecks',
    question: 'Host A transfers a file to Host B across a path consisting of three links with capacities R1 = 100 Mbps, R2 = 10 Mbps, and R3 = 50 Mbps. Assuming no other traffic on the network, what is the maximum achievable end-to-end throughput?',
    options: [
      '100 Mbps',
      '53.3 Mbps (average capacity)',
      '10 Mbps',
      '160 Mbps (sum of capacities)'
    ],
    correctAnswer: 2,
    explanation: 'End-to-end throughput is bounded by the bottleneck link along the path: min(R1, R2, R3) = min(100, 10, 50) = 10 Mbps.',
    difficulty: 'Standard'
  },
  {
    id: 'w1-q10',
    week: 1,
    weekTitle: 'Fundamentals & Packet Switching',
    topic: 'Jitter & Buffer Overflow',
    question: 'What is the primary cause of packet loss in intermediate store-and-forward packet switches?',
    options: [
      'Electromagnetic attenuation in fiber optic cables.',
      'Packet arrivals occurring when the router switch buffer memory is completely full.',
      'Checksum verification failure due to cosmic ray bit flips.',
      'Improper configuration of DNS MX resource records.'
    ],
    correctAnswer: 1,
    explanation: 'Routers have finite buffer memory. When arrival rate exceeds link transmission capacity for an extended period, the queue fills to capacity; subsequent arriving packets must be dropped (tail-drop or RED), causing packet loss.',
    difficulty: 'Standard'
  },

  // --- WEEK 2: OSI & Layer Architecture ---
  {
    id: 'w2-q1',
    week: 2,
    weekTitle: 'OSI & Layer Architecture',
    topic: 'Encapsulation & PDU Naming',
    question: 'As user data traverses downward through the TCP/IP protocol stack during transmission, what is the correct formal designation of the Protocol Data Unit (PDU) at the Transport, Network, and Link layers respectively?',
    options: [
      'Datagram, Frame, Segment',
      'Segment, Datagram (Packet), Frame',
      'Packet, Segment, Bitstream',
      'Frame, Datagram, Segment'
    ],
    correctAnswer: 1,
    explanation: 'In TCP/IP architectural terminology: Application layer produces Messages; Transport layer produces Segments (or UDP datagrams); Network layer produces Datagrams (Packets); Link layer produces Frames; and Physical layer produces Bits.',
    rfcRef: 'RFC 1122 Host Requirements',
    difficulty: 'Standard'
  },
  {
    id: 'w2-q2',
    week: 2,
    weekTitle: 'OSI & Layer Architecture',
    topic: 'OSI 7-Layer Presentation & Session',
    question: 'Which OSI model layers were omitted in the simplified 5-layer Internet architecture, with their responsibilities shifted to the application developer if required?',
    options: [
      'Network and Transport layers',
      'Session and Presentation layers',
      'Physical and Data Link layers',
      'Application and Session layers'
    ],
    correctAnswer: 1,
    explanation: 'The OSI 7-layer model includes Presentation (data formatting, encryption, compression) and Session (dialog control, checkpointing). The Internet architecture collapsed these into the Application layer, adhering to the end-to-end argument.',
    rfcRef: 'Saltzer et al. End-to-End Arguments',
    difficulty: 'Standard'
  },
  {
    id: 'w2-q3',
    week: 2,
    weekTitle: 'OSI & Layer Architecture',
    topic: 'End-to-End Argument',
    question: 'What is the central premise of the End-to-End Argument in system design formulated by Saltzer, Reed, and Clark?',
    options: [
      'Every intermediate switch must inspect and reassemble application payloads to ensure maximum reliability.',
      'Functions placed at low levels of a system may be redundant or of little value compared to providing them at higher levels with complete context.',
      'Link layers must always provide guaranteed lossless retransmissions before forwarding to the IP layer.',
      'Session encryption keys should be stored in the hardware forwarding table of all intermediate routers.'
    ],
    correctAnswer: 1,
    explanation: 'The end-to-end principle states that a function (like error recovery, security, or duplicate detection) can only be completely and correctly implemented with the knowledge and help of the endpoint application. Lower-level mechanisms are at best incomplete performance optimizations.',
    difficulty: 'Rigorous'
  },
  {
    id: 'w2-q4',
    week: 2,
    weekTitle: 'OSI & Layer Architecture',
    topic: 'Encapsulation Overhead',
    question: 'An application sends a 100-byte message over TCP/IPv4 and Ethernet. Assuming standard headers without optional fields (TCP = 20 B, IPv4 = 20 B, Ethernet = 14 B + 4 B FCS), what is the total frame size in bytes on the physical wire?',
    options: [
      '100 bytes',
      '140 bytes',
      '158 bytes',
      '164 bytes'
    ],
    correctAnswer: 2,
    explanation: 'Total frame size = Application (100) + TCP header (20) + IPv4 header (20) + Ethernet header (14) + Ethernet FCS trailer (4) = 158 bytes.',
    difficulty: 'Standard'
  },
  {
    id: 'w2-q5',
    week: 2,
    weekTitle: 'OSI & Layer Architecture',
    topic: 'Layer Boundary Crossings',
    question: 'Which of the following devices operates strictly up to Layer 2 (Data Link Layer) and does NOT inspect IP headers during normal forwarding?',
    options: [
      'Layer 3 Core Router',
      'Network Address Translator (NAT) Gateway',
      'Standard Transparent Ethernet Switch',
      'Application Level Gateway (ALG)'
    ],
    correctAnswer: 2,
    explanation: 'A standard transparent Ethernet switch inspects destination MAC addresses in the Layer 2 Ethernet frame header to make forwarding decisions and does not inspect Layer 3 IP headers or Layer 4 ports.',
    difficulty: 'Standard'
  },
  {
    id: 'w2-q6',
    week: 2,
    weekTitle: 'OSI & Layer Architecture',
    topic: 'Service Primitives',
    question: 'In layered network protocol terminology, what is a Service Data Unit (SDU)?',
    options: [
      'The entire unit of data passed down from layer (N+1) into layer N before layer N adds its own header.',
      'The packet header produced by the hardware physical layer.',
      'The CRC parity checksum appended to an Ethernet frame.',
      'A temporary socket file descriptor in the OS kernel.'
    ],
    correctAnswer: 0,
    explanation: 'An SDU (Service Data Unit) is the payload received from the adjacent higher layer. When layer N prepends its Protocol Control Information (PCI / header), it forms a PDU: PDU_N = Header_N + SDU_N.',
    difficulty: 'Advanced'
  },
  {
    id: 'w2-q7',
    week: 2,
    weekTitle: 'OSI & Layer Architecture',
    topic: 'Peer-to-Peer Communication',
    question: 'How do peer entities at Layer N on two distinct hosts communicate logically with each other?',
    options: [
      'Directly via physical radio signals bypassing all underlying layers.',
      'By exchanging Layer N PDUs through the services provided by underlying Layer (N-1).',
      'By modifying the BIOS firmware of the remote network interface card.',
      'Through a central coordinator running at the root DNS name server.'
    ],
    correctAnswer: 1,
    explanation: 'Layering provides an abstraction: Layer N entities on two communicating machines logically exchange Layer N PDUs, but physically achieve this by handing data down to Layer (N-1) service interfaces.',
    difficulty: 'Standard'
  },
  {
    id: 'w2-q8',
    week: 2,
    weekTitle: 'OSI & Layer Architecture',
    topic: 'Physical Layer Responsibilities',
    question: 'Which function is strictly the responsibility of the Physical Layer (OSI Layer 1)?',
    options: [
      'Flow control via sliding window advertisements.',
      'Bit-level transmission timing, signal voltage levels, and modulation of physical media.',
      'Media Access Control and contention resolution.',
      'End-to-end socket port demultiplexing.'
    ],
    correctAnswer: 1,
    explanation: 'Layer 1 handles the mechanical, electrical, and functional interface to the physical medium: converting bit streams into electrical, optical, or radio pulses.',
    difficulty: 'Standard'
  },
  {
    id: 'w2-q9',
    week: 2,
    weekTitle: 'OSI & Layer Architecture',
    topic: 'Multiplexing Across Layers',
    question: 'How does an incoming Ethernet frame specify whether its payload contains an IPv4 packet, an IPv6 packet, or an ARP packet?',
    options: [
      'By inspecting the TCP destination port.',
      'By reading the 2-byte EtherType field in the Ethernet II frame header.',
      'By reading the IP Version field located at offset 0.',
      'By sending a DNS pointer query to 127.0.0.1.'
    ],
    correctAnswer: 1,
    explanation: 'The Ethernet II frame contains a 16-bit EtherType field: 0x0800 denotes IPv4, 0x86DD denotes IPv6, and 0x0806 denotes ARP. This allows Layer 2 to demultiplex to the correct Layer 3 handler.',
    rfcRef: 'IEEE 802.3',
    difficulty: 'Standard'
  },
  {
    id: 'w2-q10',
    week: 2,
    weekTitle: 'OSI & Layer Architecture',
    topic: 'Layer Independence Principle',
    question: 'What is the primary architectural benefit of strict protocol layering?',
    options: [
      'It maximizes wire transmission speed by eliminating all header overhead.',
      'It isolates implementation details such that changing a protocol at one layer (e.g. Ethernet to Wi-Fi) does not require changing protocols at higher layers (e.g. IP or HTTP).',
      'It guarantees that packets will never be dropped in transit.',
      'It eliminates the need for congestion control algorithms.'
    ],
    correctAnswer: 1,
    explanation: 'Modularity and layer independence allow components to evolve independently: an application like HTTP runs unmodified whether the underlying link is fiber Ethernet, 5G cellular, or satellite radio.',
    difficulty: 'Standard'
  },

  // --- WEEK 3: HTTP/1.1 & DNS Resolution ---
  {
    id: 'w3-q1',
    week: 3,
    weekTitle: 'HTTP/1.1 & DNS Resolution',
    topic: 'HTTP Persistent Connections',
    question: 'In HTTP/1.0 without Keep-Alive, fetching an HTML document containing 10 referenced images required 11 separate TCP handshakes. How does default HTTP/1.1 mitigate this latency?',
    options: [
      'HTTP/1.1 transmits all images over unauthenticated UDP broadcast.',
      'HTTP/1.1 enables persistent connections by default, allowing multiple request-response pairs over a single open TCP connection.',
      'HTTP/1.1 compresses all 10 images into the TCP SYN handshake payload.',
      'HTTP/1.1 bypasses TCP connection teardown using ICMP Echo Request.'
    ],
    correctAnswer: 1,
    explanation: 'RFC 2616 / RFC 7230 specifies persistent connections by default (Connection: keep-alive). Once the TCP handshake completes, all consecutive requests and responses can reuse the established connection.',
    rfcRef: 'RFC 2616 Section 8.1',
    difficulty: 'Standard'
  },
  {
    id: 'w3-q2',
    week: 3,
    weekTitle: 'HTTP/1.1 & DNS Resolution',
    topic: 'Conditional GET & Caching',
    question: 'When a web browser has a cached copy of an object and wishes to check if the server copy has changed, which HTTP request header does it send, and what status code indicates the cache remains valid?',
    options: [
      'Header: Accept-Encoding; Status: 200 OK',
      'Header: If-Modified-Since (or If-None-Match); Status: 304 Not Modified',
      'Header: Authorization; Status: 401 Unauthorized',
      'Header: Cache-Control: no-cache; Status: 204 No Content'
    ],
    correctAnswer: 1,
    explanation: 'The client sends a Conditional GET with If-Modified-Since or If-None-Match (ETag). If the resource has not changed, the origin server returns 304 Not Modified without a message body, saving bandwidth.',
    rfcRef: 'RFC 7232 Conditional Requests',
    difficulty: 'Standard'
  },
  {
    id: 'w3-q3',
    week: 3,
    weekTitle: 'HTTP/1.1 & DNS Resolution',
    topic: 'DNS Recursive vs Iterative',
    question: 'In standard DNS architecture, how do the local recursive resolver and authoritative DNS servers typically interact during a cache-miss resolution?',
    options: [
      'The local resolver initiates an iterative chain: querying root (.) -> TLD (.org) -> authoritative DNS server.',
      'The root name server recursively contacts all subsequent servers and returns the final IP to the client.',
      'Authoritative servers send broadcast ARP requests to locate the target hostname.',
      'All DNS resolutions are handled by peer-to-peer flooding among client web browsers.'
    ],
    correctAnswer: 0,
    explanation: 'While the host-to-local resolver query is typically recursive, the local resolver performs iterative queries: it queries the root name server (gets TLD referral), queries the TLD server (gets authoritative referral), and finally queries the authoritative server.',
    rfcRef: 'RFC 1034 & RFC 1035',
    difficulty: 'Standard'
  },
  {
    id: 'w3-q4',
    week: 3,
    weekTitle: 'HTTP/1.1 & DNS Resolution',
    topic: 'DNS Resource Record Types',
    question: 'Match the DNS Resource Record (RR) types with their exact definitions: A, CNAME, MX, and NS.',
    options: [
      'A: IPv4 address; CNAME: Canonical hostname alias; MX: Mail exchanger; NS: Authoritative name server for domain',
      'A: IPv6 address; CNAME: Certificate name; MX: Multiplexing socket; NS: Network Subnet mask',
      'A: Anycast pointer; CNAME: Cryptographic name; MX: Media exchange; NS: Node Serial',
      'A: Application port; CNAME: Cache node; MX: Multicast group; NS: Name service'
    ],
    correctAnswer: 0,
    explanation: 'RFC 1035 defines: Type A maps hostname to 32-bit IPv4; Type CNAME maps an alias to a canonical name; Type MX designates mail delivery servers; Type NS specifies the authoritative name servers for a zone.',
    rfcRef: 'RFC 1035 Section 3.2.2',
    difficulty: 'Standard'
  },
  {
    id: 'w3-q5',
    week: 3,
    weekTitle: 'HTTP/1.1 & DNS Resolution',
    topic: 'DNS Transport Protocols',
    question: 'DNS primarily runs over UDP port 53 for standard lookups. Under what specific condition does a DNS resolver fall back to TCP port 53?',
    options: [
      'When the client operating system is running in safe mode.',
      'When the response payload exceeds 512 bytes (or EDNS0 buffer) and the TC (Truncated) bit is set in the DNS header.',
      'Whenever the query requests an MX record rather than an A record.',
      'Only when performing reverse DNS PTR lookups.'
    ],
    correctAnswer: 1,
    explanation: 'Traditional DNS over UDP limits response size to 512 bytes. If a response exceeds this limit, the server sets the TC (Truncated) bit in the header, prompting the resolver to re-issue the query over TCP port 53.',
    rfcRef: 'RFC 1035 Section 4.2.1',
    difficulty: 'Advanced'
  },
  {
    id: 'w3-q6',
    week: 3,
    weekTitle: 'HTTP/1.1 & DNS Resolution',
    topic: 'HTTP Methods Idempotency',
    question: 'Which of the following HTTP methods is defined as IDEMPOTENT by the RFC specifications?',
    options: [
      'POST',
      'PUT',
      'PATCH',
      'CONNECT'
    ],
    correctAnswer: 1,
    explanation: 'An HTTP method is idempotent if making the request multiple times produces the same server state as a single execution. GET, PUT, and DELETE are idempotent; POST is explicitly non-idempotent.',
    rfcRef: 'RFC 7231 Section 4.2.2',
    difficulty: 'Standard'
  },
  {
    id: 'w3-q7',
    week: 3,
    weekTitle: 'HTTP/1.1 & DNS Resolution',
    topic: 'DNS Time to Live (TTL)',
    question: 'What is the purpose and consequence of setting a very low TTL (e.g. 5 seconds) on a DNS A record?',
    options: [
      'It speeds up packet transmission between client and web server.',
      'It enables rapid propagation of IP address changes during server migration, at the expense of higher DNS query load on authoritative servers.',
      'It forces browsers to establish TCP connections without a 3-way handshake.',
      'It permanently disables local client DNS caching.'
    ],
    correctAnswer: 1,
    explanation: 'A low TTL ensures caching resolvers purge the record quickly, allowing DNS-based failover or migrations to take effect almost immediately. However, it increases DNS query frequency and latency overhead.',
    difficulty: 'Standard'
  },
  {
    id: 'w3-q8',
    week: 3,
    weekTitle: 'HTTP/1.1 & DNS Resolution',
    topic: 'HTTP Cookies & State Management',
    question: 'HTTP is fundamentally a stateless protocol. How does the Set-Cookie mechanism enable persistent shopping carts and user authentication?',
    options: [
      'The origin server writes directly into the client\'s operating system registry.',
      'The server includes Set-Cookie in its HTTP response header; the client stores the cookie value and transmits it in the Cookie header of subsequent requests to that domain.',
      'The client re-executes a fresh TCP 3-way handshake with an agreed-upon sequence number offset.',
      'The router rewrites the IP source address to match a session identifier.'
    ],
    correctAnswer: 1,
    explanation: 'RFC 6265 specifies that the server sends `Set-Cookie: session_id=XYZ`. The user agent caches this key-value pair and includes `Cookie: session_id=XYZ` on every subsequent request to matching domains/paths.',
    rfcRef: 'RFC 6265',
    difficulty: 'Standard'
  },
  {
    id: 'w3-q9',
    week: 3,
    weekTitle: 'HTTP/1.1 & DNS Resolution',
    topic: 'HTTP Pipelining Limitations',
    question: 'Why did major web browsers rarely enable HTTP/1.1 Pipelining by default despite its latency benefits?',
    options: [
      'It violated TCP checksum standards.',
      'Head-of-Line (HoL) blocking at the application layer: responses had to be returned in strict request order, so a slow request blocked all subsequent responses.',
      'Pipelining required all clients to possess a static public IPv4 address.',
      'Pipelining caused DNS cache poisoning.'
    ],
    correctAnswer: 1,
    explanation: 'In HTTP/1.1 pipelining, requests could be sent in batch without waiting for replies, but the server was strictly required to return responses in the exact sequence requested. If request 1 was slow, requests 2-10 were blocked (Application-layer HoL blocking).',
    rfcRef: 'RFC 7230 / RFC 7540',
    difficulty: 'Advanced'
  },
  {
    id: 'w3-q10',
    week: 3,
    weekTitle: 'HTTP/1.1 & DNS Resolution',
    topic: 'DNS Root Server Infrastructure',
    question: 'There are historically 13 logical root DNS server addresses (named [a-m].root-servers.net). How do these handle millions of global queries per second without collapsing?',
    options: [
      'Every client browser runs a full mirror of the root database locally.',
      'Each logical address is implemented via IP Anycast across hundreds of geographically distributed physical servers worldwide.',
      'They utilize quantum entanglement routers to eliminate latency.',
      'Root servers only reply once per calendar year to any given IP.'
    ],
    correctAnswer: 1,
    explanation: 'IP Anycast allows multiple physical machines in different data centers around the globe to share the same IP address. BGP routes each client\'s query to the topologically nearest physical instance.',
    difficulty: 'Standard'
  },

  // --- WEEK 4: P2P, HTTP/2 & CDN Overlays ---
  {
    id: 'w4-q1',
    week: 4,
    weekTitle: 'P2P, HTTP/2 & CDN Overlays',
    topic: 'HTTP/2 Binary Framing & Multiplexing',
    question: 'How does HTTP/2 solve the Application-layer Head-of-Line (HoL) blocking problem of HTTP/1.1?',
    options: [
      'By switching from TCP to raw UDP without flow control.',
      'By replacing plain-text delimited streams with a Binary Framing layer where messages are interleaved into independent bidirectional frames tagged with Stream IDs over a single TCP connection.',
      'By opening 50 concurrent TCP connections per web domain.',
      'By disabling compression on all transmitted payloads.'
    ],
    correctAnswer: 1,
    explanation: 'HTTP/2 breaks requests and responses into discrete binary frames (HEADERS, DATA) tagged with a stream identifier. Frames from multiple concurrent streams interleave over a single TCP connection, eliminating application-level HoL blocking.',
    rfcRef: 'RFC 7540 HTTP/2',
    difficulty: 'Advanced'
  },
  {
    id: 'w4-q2',
    week: 4,
    weekTitle: 'P2P, HTTP/2 & CDN Overlays',
    topic: 'BitTorrent Tit-for-Tat',
    question: 'In the BitTorrent peer-to-peer file distribution protocol, what algorithm does a peer use to decide which other peers to upload chunks to ("unchoke")?',
    options: [
      'First-Come First-Served regardless of reciprocation.',
      'Tit-for-Tat: unchoking the 4 peers that are currently providing the highest upload rates to it, plus 1 optimistically unchoked peer chosen at random.',
      'Centralized round-robin assigned by the tracker server.',
      'Flooding chunks to all connected peers simultaneously with equal bandwidth.'
    ],
    correctAnswer: 1,
    explanation: 'BitTorrent employs a tit-for-tat incentive mechanism: peers reciprocate by uploading to those who provide the best download rates. The "optimistically unchoked" peer randomly discovers better prospective partners.',
    difficulty: 'Standard'
  },
  {
    id: 'w4-q3',
    week: 4,
    weekTitle: 'P2P, HTTP/2 & CDN Overlays',
    topic: 'HTTP/2 Transport HoL Blocking vs QUIC',
    question: 'Although HTTP/2 eliminates application-layer HoL blocking, it remains vulnerable to Transport-layer HoL blocking over TCP. Why?',
    options: [
      'TCP requires all packets to be acknowledged within 1 millisecond.',
      'Because TCP provides a single ordered byte stream; if a single TCP packet is dropped, all interleaved HTTP/2 streams are held in the kernel buffer until the missing packet is retransmitted.',
      'HTTP/2 frames cannot be encrypted under TLS 1.3.',
      'TCP disables window scaling when HTTP/2 is negotiated via ALPN.'
    ],
    correctAnswer: 1,
    explanation: 'Since TCP guarantees in-order delivery of bytes, a single packet loss stalls the entire TCP byte stream. Even if lost bytes belong to Stream A, independent Stream B frames in subsequent packets cannot be passed to the application until the gap is filled. This motivated HTTP/3 over QUIC/UDP.',
    rfcRef: 'RFC 9000 QUIC',
    difficulty: 'Rigorous'
  },
  {
    id: 'w4-q4',
    week: 4,
    weekTitle: 'P2P, HTTP/2 & CDN Overlays',
    topic: 'CDN DNS-based Redirection',
    question: 'How does a Content Delivery Network (CDN) steer a client browser to the topologically nearest edge caching server?',
    options: [
      'By broadcasting BGP route poison messages to the client host.',
      'When the client resolves the CDN domain, the CDN authoritative DNS server inspects the resolver\'s IP (or EDNS-client-subnet) and returns the IP address of an optimal edge server nearby.',
      'By injecting ARP responses into the client\'s local subnetwork.',
      'By requiring the client to execute an ICMP traceroute before every HTTP GET.'
    ],
    correctAnswer: 1,
    explanation: 'CDNs use geographic DNS routing: when queried, the authoritative DNS server analyzes the source IP or EDNS Client Subnet (ECS) of the requesting resolver to return the IP of the best-performing, closest edge server cluster.',
    difficulty: 'Standard'
  },
  {
    id: 'w4-q5',
    week: 4,
    weekTitle: 'P2P, HTTP/2 & CDN Overlays',
    topic: 'P2P vs Client-Server Distribution Time',
    question: 'A server must distribute a file of size F to N clients. Upload rate of server is u_s, download rate of each client is d, and upload rate of each client is u. What is the theoretical minimum distribution time D_P2P in P2P mode?',
    options: [
      'D_P2P = max { F / u_s,  F / d,  (N · F) / (u_s + N · u) }',
      'D_P2P = (N · F) / u_s',
      'D_P2P = (F / u_s) + (F / d)',
      'D_P2P = N · (F / d)'
    ],
    correctAnswer: 0,
    explanation: 'In P2P, the file must be uploaded by the server at least once (F/u_s), downloaded by the slowest client (F/d), and the total N*F bits must be uploaded by the combined upload pool of server and clients: (N*F)/(u_s + N*u). The maximum of these three bounds sets the minimum time.',
    difficulty: 'Advanced'
  },
  {
    id: 'w4-q6',
    week: 4,
    weekTitle: 'P2P, HTTP/2 & CDN Overlays',
    topic: 'HTTP/2 HPACK Header Compression',
    question: 'What header compression mechanism does HTTP/2 introduce to eliminate redundant HTTP header strings (such as User-Agent and Cookies)?',
    options: [
      'GZIP compression across the entire TCP socket.',
      'HPACK, which uses indexed tables (static table of common headers + dynamic table of session-specific headers) and Huffman coding.',
      'Lempel-Ziv dictionary encoding inside DNS records.',
      'Base64 encoding with CRC-32 validation.'
    ],
    correctAnswer: 1,
    explanation: 'HTTP/2 introduced HPACK (RFC 7541) specifically designed to prevent CRIME security vulnerabilities inherent in gzip, using pre-defined static and connection-specific dynamic indexing with Huffman encoding.',
    rfcRef: 'RFC 7541 HPACK',
    difficulty: 'Standard'
  },
  {
    id: 'w4-q7',
    week: 4,
    weekTitle: 'P2P, HTTP/2 & CDN Overlays',
    topic: 'Distributed Hash Tables (DHT)',
    question: 'In modern trackerless BitTorrent, which structured peer-to-peer overlay network protocol is commonly used for key-based chunk lookups?',
    options: [
      'Kademlia DHT using XOR metric distance',
      'OSPF Dijkstra Tree',
      'Spanning Tree Protocol 802.1D',
      'Border Gateway Protocol AS-PATH'
    ],
    correctAnswer: 0,
    explanation: 'Trackerless BitTorrent (Mainline DHT) is based on the Kademlia protocol, which computes distance between nodes and keys using bitwise XOR and organizes routing tables into k-buckets.',
    difficulty: 'Advanced'
  },
  {
    id: 'w4-q8',
    week: 4,
    weekTitle: 'P2P, HTTP/2 & CDN Overlays',
    topic: 'HTTP/2 Server Push',
    question: 'What is the purpose of HTTP/2 Server Push?',
    options: [
      'To force client browsers to install operating system updates.',
      'To allow the server to preemptively send resources (such as CSS or JS files) to the client cache before the client parses the HTML and asks for them.',
      'To send WebSocket broadcast messages to all connected subscribers.',
      'To reboot the client network interface card.'
    ],
    correctAnswer: 1,
    explanation: 'Server Push allows the server to send PUSH_PROMISE frames followed by data frames for dependent resources (like styles.css) that the server knows the client will need, saving a round-trip time.',
    rfcRef: 'RFC 7540 Section 8.2',
    difficulty: 'Standard'
  },
  {
    id: 'w4-q9',
    week: 4,
    weekTitle: 'P2P, HTTP/2 & CDN Overlays',
    topic: 'CDN Caching Invalidation',
    question: 'What is the "Cache-Control: s-maxage" directive used for in HTTP headers?',
    options: [
      'It specifies the maximum time an object can remain in the client browser private cache.',
      'It overrides max-age specifically for shared public caches (such as CDN edge proxies).',
      'It sets the maximum server socket timeout in milliseconds.',
      'It specifies the maximum size of the SSL certificate.'
    ],
    correctAnswer: 1,
    explanation: 'The `s-maxage` directive stands for "shared max-age" and takes precedence over `max-age` for shared/proxy caches (e.g. CDNs), leaving the browser\'s private caching behavior to standard `max-age`.',
    difficulty: 'Standard'
  },
  {
    id: 'w4-q10',
    week: 4,
    weekTitle: 'P2P, HTTP/2 & CDN Overlays',
    topic: 'ALPN Negotiation',
    question: 'How do a TLS client and server agree to use HTTP/2 instead of HTTP/1.1 during the initial TLS handshake?',
    options: [
      'Via Application-Layer Protocol Negotiation (ALPN) extension in the TLS ClientHello and ServerHello.',
      'By sending a DNS TXT query during domain resolution.',
      'Through a dedicated HTTP 426 Upgrade header after TCP teardown.',
      'By checking the IP TTL field in the first packet.'
    ],
    correctAnswer: 0,
    explanation: 'ALPN (RFC 7301) is a TLS extension where the client advertises supported protocols (e.g., "h2", "http/1.1") inside TLS ClientHello, and the server selects "h2" in ServerHello, avoiding an extra round-trip.',
    rfcRef: 'RFC 7301 ALPN',
    difficulty: 'Standard'
  },

  // --- WEEK 5: Transport Layer & Sockets ---
  {
    id: 'w5-q1',
    week: 5,
    weekTitle: 'Transport Layer & Sockets',
    topic: 'Transport Demultiplexing',
    question: 'How does an operating system kernel uniquely identify which socket should receive an incoming TCP segment, compared to a UDP datagram?',
    options: [
      'TCP: 2-tuple (Dest IP, Dest Port); UDP: 4-tuple (Source IP, Source Port, Dest IP, Dest Port)',
      'TCP: 4-tuple (Source IP, Source Port, Dest IP, Dest Port); UDP: 2-tuple (Dest IP, Dest Port)',
      'Both TCP and UDP use MAC addresses only.',
      'Both TCP and UDP use the Process ID (PID) encoded in the IP header.'
    ],
    correctAnswer: 1,
    explanation: 'A UDP socket is identified by a 2-tuple (destination IP, destination port). A TCP socket is identified by a 4-tuple (source IP, source port, destination IP, destination port); two TCP segments with identical destination ports but different source IPs/ports go to different sockets.',
    rfcRef: 'Kurose & Ross Section 3.2',
    difficulty: 'Standard'
  },
  {
    id: 'w5-q2',
    week: 5,
    weekTitle: 'Transport Layer & Sockets',
    topic: 'UDP Checksum Calculation',
    question: 'How is the UDP checksum calculated across the UDP pseudo-header, UDP header, and payload?',
    options: [
      'Using a 32-bit CRC polynomial division remainder.',
      'By summing 16-bit words in 1s complement arithmetic and taking the 1s complement of the final sum.',
      'By hashing the contents with MD5 and truncating to 16 bits.',
      'By computing the parity XOR of every single bit in the datagram.'
    ],
    correctAnswer: 1,
    explanation: 'RFC 768 specifies: the checksum is the 16-bit 1s complement of the 1s complement sum of all 16-bit words in the pseudo-header, header, and data. Any carry bits during addition are wrapped around to the least significant bit.',
    rfcRef: 'RFC 768 UDP',
    difficulty: 'Standard'
  },
  {
    id: 'w5-q3',
    week: 5,
    weekTitle: 'Transport Layer & Sockets',
    topic: 'UDP Pseudo-Header Purpose',
    question: 'Why does the UDP checksum calculation include an IP "pseudo-header" containing Source IP, Destination IP, Protocol (17), and UDP length?',
    options: [
      'To allow UDP to perform link-layer framing without Ethernet.',
      'To detect misrouted datagrams delivered to the wrong host or protocol handler.',
      'To encrypt the payload against packet sniffing.',
      'To calculate the path MTU automatically.'
    ],
    correctAnswer: 1,
    explanation: 'The pseudo-header verifies that the datagram has reached the intended destination host and protocol type. If a router or bridge corrupted the destination IP address, the checksum fails at the transport layer.',
    difficulty: 'Advanced'
  },
  {
    id: 'w5-q4',
    week: 5,
    weekTitle: 'Transport Layer & Sockets',
    topic: 'BSD Socket API Sequence',
    question: 'On a TCP server using the BSD Socket API, what is the correct chronological order of system calls required to prepare for and accept an incoming client connection?',
    options: [
      'socket() -> listen() -> bind() -> accept()',
      'socket() -> bind() -> listen() -> accept()',
      'bind() -> socket() -> connect() -> read()',
      'socket() -> connect() -> listen() -> bind()'
    ],
    correctAnswer: 1,
    explanation: 'The server calls `socket()` to create the socket descriptor, `bind()` to associate it with a specific IP address and port, `listen()` to set the backlog queue, and `accept()` which blocks until a 3-way handshake completes, returning a new connected socket descriptor.',
    difficulty: 'Standard'
  },
  {
    id: 'w5-q5',
    week: 5,
    weekTitle: 'Transport Layer & Sockets',
    topic: 'Ephemeral Port Range',
    question: 'When a client calls `connect()` without prior `bind()`, the operating system kernel automatically assigns an ephemeral port. Which IANA port range is officially designated for dynamic/private ephemeral ports?',
    options: [
      '0 to 1,023',
      '1,024 to 49,151',
      '49,152 to 65,535',
      '65,536 to 131,072'
    ],
    correctAnswer: 2,
    explanation: 'IANA assigns ports 0-1023 as Well-Known/System ports, 1024-49151 as Registered ports, and 49152-65535 as Dynamic/Private/Ephemeral ports.',
    rfcRef: 'RFC 6335',
    difficulty: 'Standard'
  },
  {
    id: 'w5-q6',
    week: 5,
    weekTitle: 'Transport Layer & Sockets',
    topic: 'UDP vs TCP Header Size',
    question: 'What are the base header sizes (excluding options) for UDP and TCP respectively?',
    options: [
      'UDP = 4 bytes, TCP = 16 bytes',
      'UDP = 8 bytes, TCP = 20 bytes',
      'UDP = 16 bytes, TCP = 32 bytes',
      'UDP = 20 bytes, TCP = 40 bytes'
    ],
    correctAnswer: 1,
    explanation: 'UDP header is 8 bytes (Source Port: 2B, Dest Port: 2B, Length: 2B, Checksum: 2B). Standard TCP header is 20 bytes (five 32-bit words).',
    rfcRef: 'RFC 768 / RFC 793',
    difficulty: 'Standard'
  },
  {
    id: 'w5-q7',
    week: 5,
    weekTitle: 'Transport Layer & Sockets',
    topic: 'Non-blocking I/O & Multiplexing',
    question: 'Which system call mechanism allows a high-concurrency network server (such as NGINX or Node.js) to monitor thousands of active socket file descriptors with O(1) complexity per ready event on Linux?',
    options: [
      'select()',
      'poll()',
      'epoll()',
      'busy-wait sleep loop'
    ],
    correctAnswer: 2,
    explanation: 'Unlike `select()` and `poll()` which require scanning the entire array of file descriptors in O(n) time on every event, Linux `epoll` uses event-driven callbacks in the kernel, providing O(1) performance for ready file descriptors.',
    difficulty: 'Advanced'
  },
  {
    id: 'w5-q8',
    week: 5,
    weekTitle: 'Transport Layer & Sockets',
    topic: 'UDP Unconnected vs Connected Socket',
    question: 'What occurs when a client calls `connect()` on a UDP socket?',
    options: [
      'The kernel initiates a 3-way handshake with SYN packets.',
      'The kernel records the remote peer IP and port, restricting `read()`/`write()` to that address and enabling asynchronous ICMP error delivery without sending any wire packets.',
      'The socket transitions to TCP streaming mode.',
      'The OS disables UDP checksum checking.'
    ],
    correctAnswer: 1,
    explanation: 'Calling `connect()` on a UDP socket does not transmit any packets over the network. It registers the destination 2-tuple in the OS kernel, allowing use of `send()`/`recv()` instead of `sendto()`/`recvfrom()` and receiving ICMP Unreachable notifications.',
    difficulty: 'Rigorous'
  },
  {
    id: 'w5-q9',
    week: 5,
    weekTitle: 'Transport Layer & Sockets',
    topic: 'Socket Buffer Overflow',
    question: 'If an application writes data into a TCP socket buffer faster than the remote receiver consumes it and the network can transmit, what happens when the socket is in default blocking mode?',
    options: [
      'The write() call immediately returns -1 with EAGAIN.',
      'The operating system silently discards the extra bytes.',
      'The write() system call blocks (suspends the calling thread) until buffer space becomes available.',
      'The socket automatically closes with a FIN packet.'
    ],
    correctAnswer: 2,
    explanation: 'In blocking mode, if the socket write buffer is full (governed by socket buffer size SO_SNDBUF and remote advertised window), `write()` or `send()` suspends execution until space frees up.',
    difficulty: 'Standard'
  },
  {
    id: 'w5-q10',
    week: 5,
    weekTitle: 'Transport Layer & Sockets',
    topic: 'TCP Half-Close',
    question: 'Which TCP socket API system call signals to the remote peer that the local application has finished sending data, while keeping the socket open to receive incoming data?',
    options: [
      'close(sock_fd)',
      'shutdown(sock_fd, SHUT_WR)',
      'abort()',
      'setsockopt(SO_REUSEADDR)'
    ],
    correctAnswer: 1,
    explanation: 'Calling `shutdown(sock_fd, SHUT_WR)` sends a FIN packet to initiate half-close: the local endpoint can no longer transmit, but can continue reading data until the remote endpoint also transmits a FIN.',
    rfcRef: 'RFC 793 Section 3.5',
    difficulty: 'Standard'
  },

  // --- WEEK 6: RDT & Go-Back-N / Selective Repeat ---
  {
    id: 'w6-q1',
    week: 6,
    weekTitle: 'RDT & Go-Back-N / Selective Repeat',
    topic: 'RDT 3.0 Alternating Bit Protocol',
    question: 'In the Stop-and-Wait protocol (rdt 3.0) with an alternating 1-bit sequence number (0 and 1), why is a sequence number necessary when packets are only sent one at a time?',
    options: [
      'To allow the receiver to detect duplicate data packets caused by premature sender timeouts and delayed ACKs.',
      'To calculate the 16-bit CRC checksum.',
      'To allow the sender to transmit 2 packets concurrently.',
      'To negotiate the maximum segment size (MSS).'
    ],
    correctAnswer: 0,
    explanation: 'If an ACK is delayed or lost, the sender times out and retransmits the previous packet. Without a sequence number, the receiver cannot distinguish whether the arriving packet is new data or a duplicate of the previous packet.',
    difficulty: 'Standard'
  },
  {
    id: 'w6-q2',
    week: 6,
    weekTitle: 'RDT & Go-Back-N / Selective Repeat',
    topic: 'Go-Back-N Cumulative ACK Behavior',
    question: 'In a Go-Back-N (GBN) sliding window protocol with window size N = 4, suppose packets 0, 1, 2, and 3 are transmitted. Packet 1 is lost in transit, but packets 0, 2, and 3 arrive safely. What action does the GBN receiver take?',
    options: [
      'Buffers packets 2 and 3 and sends selective ACKs for 2 and 3.',
      'Discards out-of-order packets 2 and 3, re-sending cumulative ACK 0 for each received packet.',
      'Sends a Negative Acknowledgment (NACK 1) and accepts 2 and 3.',
      'Advances its receive window to index 4.'
    ],
    correctAnswer: 1,
    explanation: 'GBN uses cumulative ACKs without receive buffering. The receiver strictly expects in-order packets. When out-of-order packet 2 or 3 arrives without packet 1, it discards them and repeats ACK 0 (the highest in-order sequence number received).',
    difficulty: 'Standard'
  },
  {
    id: 'w6-q3',
    week: 6,
    weekTitle: 'RDT & Go-Back-N / Selective Repeat',
    topic: 'Selective Repeat Window Size Constraint',
    question: 'In Selective Repeat (SR), if sequence numbers range from 0 to (2^k - 1), what is the maximum permissible sender and receiver window size W to prevent ambiguous sequence number overlap between new and retransmitted packets?',
    options: [
      'W <= 2^k - 1',
      'W <= 2^(k - 1)',
      'W <= 2^(k + 1)',
      'W <= k'
    ],
    correctAnswer: 1,
    explanation: 'In Selective Repeat, the window size W must satisfy: W_sender + W_receiver <= 2^k. Assuming equal sender and receiver windows: 2W <= 2^k => W <= 2^(k-1) (exactly half the sequence number space). Otherwise, duplicate packets wrap around and get misidentified as new packets.',
    rfcRef: 'Kurose & Ross Section 3.4.4',
    difficulty: 'Rigorous'
  },
  {
    id: 'w6-q4',
    week: 6,
    weekTitle: 'RDT & Go-Back-N / Selective Repeat',
    topic: 'GBN vs SR Timer Implementation',
    question: 'How do the retransmission timer mechanisms differ between Go-Back-N (GBN) and Selective Repeat (SR)?',
    options: [
      'GBN maintains a separate hardware timer for every unacknowledged packet, while SR uses no timers.',
      'GBN maintains a single timer for the oldest unacknowledged packet; SR maintains an individual logical timer for each unacknowledged packet in the window.',
      'SR only retransmits when it receives an explicit ICMP Time Exceeded packet.',
      'GBN only retransmits upon receiving 3 duplicate ACKs.'
    ],
    correctAnswer: 1,
    explanation: 'GBN tracks the earliest transmitted unACKed packet with a single timer. If it fires, the sender retransmits all N unACKed packets in the window. SR individually tracks and retransmits only the specific packet that timed out.',
    difficulty: 'Standard'
  },
  {
    id: 'w6-q5',
    week: 6,
    weekTitle: 'RDT & Go-Back-N / Selective Repeat',
    topic: 'Channel Utilization in Stop-and-Wait',
    question: 'On a link with 1 Gbps transmission rate, 15 ms propagation delay, and packet size L = 8,000 bits (1 KB), what is the link utilization U_sender under Stop-and-Wait protocol (ignoring ACK transmission time)?',
    options: [
      'U ≈ 0.027% (extremely low)',
      'U ≈ 50.0%',
      'U ≈ 99.9%',
      'U ≈ 12.5%'
    ],
    correctAnswer: 0,
    explanation: 'd_trans = 8,000 bits / 10⁹ bps = 8 μs (0.008 ms). Round trip time RTT = 2 * 15 ms = 30 ms. Total time to send and receive ACK = d_trans + RTT = 30.008 ms. Utilization U = d_trans / (d_trans + RTT) = 0.008 / 30.008 ≈ 0.000267 ≈ 0.027%. Pipelining is essential.',
    difficulty: 'Advanced'
  },
  {
    id: 'w6-q6',
    week: 6,
    weekTitle: 'RDT & Go-Back-N / Selective Repeat',
    topic: 'Go-Back-N Window Size Limit',
    question: 'In Go-Back-N, with sequence number field of k bits (sequence numbers 0 to 2^k - 1), what is the maximum allowed window size N?',
    options: [
      'N = 2^k',
      'N = 2^k - 1',
      'N = 2^(k - 1)',
      'N = 2^k + 1'
    ],
    correctAnswer: 1,
    explanation: 'In GBN, the window size cannot exceed 2^k - 1. If N = 2^k, and all ACKs for a full window are lost, the sender retransmits sequence 0, which the receiver (expecting new sequence 0) would incorrectly accept as new data.',
    difficulty: 'Standard'
  },
  {
    id: 'w6-q7',
    week: 6,
    weekTitle: 'RDT & Go-Back-N / Selective Repeat',
    topic: 'Selective Repeat Receive Window',
    question: 'When the Selective Repeat receiver receives a packet whose sequence number falls within [rcv_base - N, rcv_base - 1], what must it do?',
    options: [
      'Discard the packet and do nothing.',
      'Re-acknowledge the packet with an ACK for that sequence number, even though it was already delivered to the application.',
      'Crash the connection and send a RST.',
      'Advance the rcv_base forward by N packets.'
    ],
    correctAnswer: 1,
    explanation: 'The receiver must re-acknowledge previously accepted packets in the [rcv_base - N, rcv_base - 1] window because the sender might not have received the original ACK and will keep retransmitting until acknowledged.',
    difficulty: 'Advanced'
  },
  {
    id: 'w6-q8',
    week: 6,
    weekTitle: 'RDT & Go-Back-N / Selective Repeat',
    topic: 'Pipelining Bandwidth Utilization',
    question: 'If the stop-and-wait utilization is U = 0.00027, what window size W is required to achieve 100% link utilization?',
    options: [
      'W = 10',
      'W = 100',
      'W ≈ 3,751 packets',
      'W = 65,535 packets'
    ],
    correctAnswer: 2,
    explanation: 'To achieve 100% utilization, W * d_trans >= d_trans + RTT => W >= (d_trans + RTT) / d_trans = 30.008 / 0.008 = 3,751 packets.',
    difficulty: 'Standard'
  },
  {
    id: 'w6-q9',
    week: 6,
    weekTitle: 'RDT & Go-Back-N / Selective Repeat',
    topic: 'Cumulative ACK Advantages',
    question: 'What is a major advantage of cumulative acknowledgments (as used in Go-Back-N and TCP) over individual acknowledgments?',
    options: [
      'Cumulative ACKs guarantee that no packets ever experience delay.',
      'Loss of an individual ACK packet is naturally tolerated if a subsequent higher cumulative ACK arrives before the sender timeout expires.',
      'They eliminate the need for sequence numbers in packet headers.',
      'They double the link bandwidth.'
    ],
    correctAnswer: 1,
    explanation: 'If ACK 1, ACK 2, and ACK 3 are sent, and ACK 2 is lost in transit, the arrival of cumulative ACK 3 confirms to the sender that all packets up to and including packet 3 were successfully received.',
    difficulty: 'Standard'
  },
  {
    id: 'w6-q10',
    week: 6,
    weekTitle: 'RDT & Go-Back-N / Selective Repeat',
    topic: 'Finite State Machine Checksums',
    question: 'In the rdt 2.1 state machine, how does the receiver verify data integrity against bit corruption before parsing the packet?',
    options: [
      'By querying an external NTP time server.',
      'By recomputing the checksum over the received packet and comparing it against the checksum header field.',
      'By counting the total number of 1s in the IP destination address.',
      'By issuing a broadcast ARP request.'
    ],
    correctAnswer: 1,
    explanation: 'The receiver recomputes the checksum algorithm across the packet fields. If the computed value differs from the embedded checksum, corruption is detected, and a NAK (or duplicate ACK) is triggered.',
    difficulty: 'Standard'
  },

  // --- WEEK 7: TCP Flow & Congestion Control ---
  {
    id: 'w7-q1',
    week: 7,
    weekTitle: 'TCP Flow & Congestion Control',
    topic: 'TCP 3-Way Handshake SYN Flooding',
    question: 'During the TCP 3-way handshake (SYN -> SYN-ACK -> ACK), how does the SYN Cookie defense mitigate resource exhaustion from SYN flood attacks?',
    options: [
      'The server rejects all connection requests from non-whitelisted IP addresses.',
      'The server does not allocate half-open state in memory upon receiving a SYN; instead, it encodes the state into the initial sequence number (ISN) of the SYN-ACK using a cryptographic hash.',
      'The server immediately responds with a TCP RST packet.',
      'The server increases its TCP listen backlog to 10 million entries.'
    ],
    correctAnswer: 1,
    explanation: 'SYN Cookies prevent memory exhaustion by not storing any state for half-open connections. The server crafts the SYN-ACK Initial Sequence Number (ISN) containing a cryptographic hash of client IP, client port, and secret key. When the final ACK arrives, the server verifies the cookie and allocates the socket.',
    rfcRef: 'RFC 4987 TCP SYN Flooding Attacks',
    difficulty: 'Advanced'
  },
  {
    id: 'w7-q2',
    week: 7,
    weekTitle: 'TCP Flow & Congestion Control',
    topic: 'Slow Start cwnd Growth Rate',
    question: 'In TCP Slow Start phase, assuming every segment is acknowledged without loss and delayed ACKs are disabled, how does the Congestion Window (cwnd) grow each Round-Trip Time (RTT)?',
    options: [
      'It increases linearly by 1 MSS per RTT.',
      'It doubles every RTT (exponential growth: cwnd = 2^k * MSS).',
      'It increases logarithmically.',
      'It remains constant until ssthresh is reached.'
    ],
    correctAnswer: 1,
    explanation: 'During Slow Start, cwnd increases by 1 MSS for every received valid ACK. Since transmitting cwnd segments produces cwnd ACKs, cwnd doubles every RTT (1 -> 2 -> 4 -> 8...), exhibiting exponential growth despite the name "Slow" Start.',
    rfcRef: 'RFC 5681 TCP Congestion Control',
    difficulty: 'Standard'
  },
  {
    id: 'w7-q3',
    week: 7,
    weekTitle: 'TCP Flow & Congestion Control',
    topic: 'Fast Retransmit & 3 Duplicate ACKs',
    question: 'Why does TCP trigger Fast Retransmit specifically after receiving 3 DUPLICATE ACKs, rather than waiting for the Retransmission Timeout (RTO) or firing on the very first duplicate ACK?',
    options: [
      '3 duplicate ACKs indicate that the receiver buffer has overflowed.',
      'A single duplicate ACK often occurs simply due to transient packet reordering on the path; receiving 3 duplicate ACKs provides strong probabilistic evidence that a packet was truly dropped while other packets continue arriving.',
      'TCP headers only have 2 bits to count acknowledgments.',
      'Because RFC 793 requires waiting 3 seconds before retransmitting.'
    ],
    correctAnswer: 1,
    explanation: 'If packets arrive out of order (e.g. packet 2 before packet 1), 1 or 2 duplicate ACKs are generated. But if 3 duplicate ACKs arrive, at least 3 packets sent AFTER the missing segment arrived at the receiver, confirming packet loss without waiting for a sluggish RTO.',
    rfcRef: 'RFC 5681 Section 3.2',
    difficulty: 'Standard'
  },
  {
    id: 'w7-q4',
    week: 7,
    weekTitle: 'TCP Flow & Congestion Control',
    topic: 'TCP Tahoe vs TCP Reno',
    question: 'How do TCP Tahoe and TCP Reno differ when packet loss is detected via 3 Duplicate ACKs?',
    options: [
      'Tahoe sets cwnd = 1 MSS and enters Slow Start; Reno sets ssthresh = cwnd / 2, sets cwnd = ssthresh + 3 MSS, and enters Fast Recovery without dropping cwnd back to 1.',
      'Tahoe ignores duplicate ACKs completely; Reno terminates the connection.',
      'Tahoe doubles the window; Reno halves the window.',
      'Tahoe uses cubic curves; Reno uses linear curves.'
    ],
    correctAnswer: 0,
    explanation: 'TCP Tahoe cuts cwnd to 1 MSS on any loss (timeout or duplicate ACKs). TCP Reno introduced Fast Recovery: recognizing that packets are still getting through on duplicate ACKs, it sets ssthresh = cwnd/2, inflates cwnd for duplicate ACKs, retransmits the lost segment, and resumes AIMD Congestion Avoidance.',
    rfcRef: 'Jacobson 1988 Congestion Avoidance',
    difficulty: 'Advanced'
  },
  {
    id: 'w7-q5',
    week: 7,
    weekTitle: 'TCP Flow & Congestion Control',
    topic: 'Jacobson/Karels RTO Formula',
    question: 'TCP calculates the Retransmission Timeout (RTO) dynamically using EstimatedRTT and DevRTT (RTT deviation). What is the standard RFC 6298 formula for RTO?',
    options: [
      'RTO = EstimatedRTT + 4 × DevRTT',
      'RTO = 2 × EstimatedRTT',
      'RTO = EstimatedRTT + DevRTT / 2',
      'RTO = SampleRTT × 2'
    ],
    correctAnswer: 0,
    explanation: 'RFC 6298 specifies: RTO = EstimatedRTT + max(G, 4 * DevRTT), where G is clock granularity. If the variance DevRTT is high, the margin 4*DevRTT widens the timeout to prevent premature false retransmissions.',
    rfcRef: 'RFC 6298',
    difficulty: 'Standard'
  },
  {
    id: 'w7-q6',
    week: 7,
    weekTitle: 'TCP Flow & Congestion Control',
    topic: 'Flow Control vs Congestion Control',
    question: 'What is the fundamental difference between TCP Flow Control and TCP Congestion Control?',
    options: [
      'Flow control prevents the sender from overwhelming the receiver\'s buffer (governed by rwnd); Congestion control prevents the sender from overwhelming the intermediate network routers (governed by cwnd).',
      'Flow control operates at Layer 3; Congestion control operates at Layer 2.',
      'Flow control is only used in UDP; Congestion control is only used in TCP.',
      'Flow control controls transmission speed using GPS time synchronization.'
    ],
    correctAnswer: 0,
    explanation: 'Flow control is an end-to-end agreement: the receiver advertises Receive Window (rwnd) in headers so the sender never overflows its memory buffer. Congestion control monitors network capacity: the sender dynamically computes Congestion Window (cwnd). The effective window is min(rwnd, cwnd).',
    difficulty: 'Standard'
  },
  {
    id: 'w7-q7',
    week: 7,
    weekTitle: 'TCP Flow & Congestion Control',
    topic: 'TCP Silly Window Syndrome',
    question: 'What is Silly Window Syndrome (SWS) in TCP, and how does Clark\'s algorithm at the receiver prevent it?',
    options: [
      'A bug where sequence numbers wrap around in 1 millisecond.',
      'A condition where data is exchanged in tiny fragments (e.g. 1 byte) due to a slowly draining receiver buffer; Clark\'s algorithm prevents advertising tiny windows until the receiver can accept min(MSS, buffer/2).',
      'A denial of service attack exploiting TCP urgent pointer.',
      'When window size is set to zero permanently.'
    ],
    correctAnswer: 1,
    explanation: 'If a receiver consumes bytes slowly (1 byte at a time), it might advertise a 1-byte window, causing the sender to transmit 1 byte of payload wrapped in 40 bytes of header. Clark\'s algorithm mandates advertising rwnd = 0 until buffer space is at least 1 MSS or half the total buffer.',
    rfcRef: 'RFC 813 Window and Acknowledgment Strategy',
    difficulty: 'Advanced'
  },
  {
    id: 'w7-q8',
    week: 7,
    weekTitle: 'TCP Flow & Congestion Control',
    topic: 'TCP Nagle Algorithm',
    question: 'What is the purpose of Nagle\'s algorithm (TCP_NODELAY)?',
    options: [
      'To prevent the sender application from emitting small packets by buffering outgoing data until all previous in-flight packets are ACKed or a full MSS of data accumulates.',
      'To force immediate transmission of every keystroke in Telnet/SSH without any buffering.',
      'To encrypt TCP payloads with AES-GCM.',
      'To compress IP packet headers.'
    ],
    correctAnswer: 0,
    explanation: 'Nagle\'s algorithm (RFC 896) inhibits sending small segments (less than MSS) if there is any unacknowledged data outstanding on the connection, coalescing small writes into larger datagrams.',
    rfcRef: 'RFC 896 Congestion Control in IP/TCP',
    difficulty: 'Standard'
  },
  {
    id: 'w7-q9',
    week: 7,
    weekTitle: 'TCP Flow & Congestion Control',
    topic: 'TCP TIME_WAIT State Duration',
    question: 'Why does the TCP endpoint that initiates active close remain in the TIME_WAIT state for 2 × MSL (Maximum Segment Lifetime)?',
    options: [
      'To ensure the final ACK arrives at the peer (and resend it if the peer retransmits FIN), and to ensure old duplicate segments from the connection expire in the network before a new socket can reuse the same port.',
      'To allow the operating system kernel to defragment the hard drive.',
      'Because TCP sequence numbers take 2 minutes to decay chemically.',
      'To give the remote server time to reboot.'
    ],
    correctAnswer: 0,
    explanation: 'TIME_WAIT (typically 1-2 minutes = 2*MSL) accomplishes two tasks: 1) reliably delivers the final ACK so the remote peer can close cleanly; 2) guarantees that any delayed duplicate packets wandering in network buffers have died before a new incarnation of the connection opens.',
    rfcRef: 'RFC 793 Section 3.5',
    difficulty: 'Standard'
  },
  {
    id: 'w7-q10',
    week: 7,
    weekTitle: 'TCP Flow & Congestion Control',
    topic: 'Explicit Congestion Notification (ECN)',
    question: 'How does ECN (Explicit Congestion Notification) allow intermediate routers to signal impending buffer congestion to endpoints without dropping packets?',
    options: [
      'By sending ICMP Source Quench messages back to the sender.',
      'By marking the 2-bit ECN field (bits 6 and 7 in the IPv4 DiffServ / IPv6 Traffic Class byte) with \'11\' (Congestion Encountered - CE); the receiver echoes this via the ECE flag in the TCP header.',
      'By increasing the TCP window size field.',
      'By rewriting the destination MAC address to the broadcast address.'
    ],
    correctAnswer: 1,
    explanation: 'RFC 3168 defines ECN: routers experiencing queue buildup mark the CE codepoint (11) in the IP header instead of dropping the packet. The receiver notices CE and sets the ECE (ECN-Echo) bit in its TCP ACK, prompting the sender to reduce cwnd.',
    rfcRef: 'RFC 3168 ECN',
    difficulty: 'Advanced'
  },

  // --- WEEK 8: IP Forwarding, CIDR & TCAM ---
  {
    id: 'w8-q1',
    week: 8,
    weekTitle: 'IP Forwarding, CIDR & TCAM',
    topic: 'Longest Prefix Match (LPM)',
    question: 'A router has the following forwarding table:\n1) 192.168.0.0/16 -> Interface 1\n2) 192.168.1.0/24 -> Interface 2\n3) 192.168.1.128/25 -> Interface 3\n4) 0.0.0.0/0 -> Interface 4\nWhich interface will a packet addressed to 192.168.1.140 be forwarded to?',
    options: [
      'Interface 1',
      'Interface 2',
      'Interface 3',
      'Interface 4'
    ],
    correctAnswer: 2,
    explanation: '192.168.1.140 matches entry 1 (/16), entry 2 (/24), and entry 3 (/25, since 140 >= 128). Under Longest Prefix Match (LPM), the router selects the entry with the longest matching subnet mask (/25), which points to Interface 3.',
    difficulty: 'Standard'
  },
  {
    id: 'w8-q2',
    week: 8,
    weekTitle: 'IP Forwarding, CIDR & TCAM',
    topic: 'CIDR Subnetting Calculation',
    question: 'How many usable host IP addresses are available in the IPv4 subnet 172.16.4.0/22?',
    options: [
      '1,022',
      '1,024',
      '510',
      '2,046'
    ],
    correctAnswer: 0,
    explanation: 'A /22 prefix has 32 - 22 = 10 host bits. Total IP addresses = 2¹⁰ = 1,024. Subtracting the network address (all host bits 0) and the directed broadcast address (all host bits 1) leaves 1,024 - 2 = 1,022 usable host addresses.',
    difficulty: 'Standard'
  },
  {
    id: 'w8-q3',
    week: 8,
    weekTitle: 'IP Forwarding, CIDR & TCAM',
    topic: 'TCAM Hardware Lookup Architecture',
    question: 'Why do high-performance core IP routers utilize Ternary Content Addressable Memory (TCAM) for routing table lookup engines?',
    options: [
      'TCAM consumes significantly less electrical power than standard DRAM.',
      'TCAM can compare an input IP address against all table entries in parallel in a single clock cycle, natively supporting 0, 1, and "don\'t care" (X) wildcard bit masks.',
      'TCAM can store gigabytes of user payload data.',
      'TCAM automatically recalculates Dijkstra shortest path trees.'
    ],
    correctAnswer: 1,
    explanation: 'Unlike standard binary CAM (which matches only 0 and 1), TCAM matches a third "don\'t care" state, allowing arbitrary subnet masks to be evaluated across hundreds of thousands of prefix rules simultaneously in O(1) clock cycles.',
    difficulty: 'Advanced'
  },
  {
    id: 'w8-q4',
    week: 8,
    weekTitle: 'IP Forwarding, CIDR & TCAM',
    topic: 'IPv4 Header Fragmentation Fields',
    question: 'When an IPv4 datagram exceeds the link MTU and must be fragmented, which header fields are modified and used by the receiving host to reassemble the fragments?',
    options: [
      'Identification, Flags (DF, MF), and Fragment Offset (measured in 8-byte units)',
      'Time to Live and Type of Service',
      'Source Port and Sequence Number',
      'Header Checksum and Options padding only'
    ],
    correctAnswer: 0,
    explanation: 'All fragments share the same Identification number. More Fragments (MF) flag is set to 1 for all fragments except the last. Fragment Offset specifies the position of the fragment data relative to the original datagram in units of 8 bytes (64 bits).',
    rfcRef: 'RFC 791 Internet Protocol',
    difficulty: 'Standard'
  },
  {
    id: 'w8-q5',
    week: 8,
    weekTitle: 'IP Forwarding, CIDR & TCAM',
    topic: 'NAT and Port Translation (NAPT)',
    question: 'How does Network Address and Port Translation (NAPT) allow hundreds of home devices to concurrently browse the Internet using a single public IPv4 address?',
    options: [
      'By assigning each device a different TCP window size.',
      'By translating private internal IP:port pairs (e.g. 192.168.1.15:49152) into the router\'s public IP paired with unique allocated source port numbers in a NAT translation table.',
      'By encapsulating all IPv4 packets in IPv6 NDP neighbor advertisements.',
      'By converting all TCP connections into UDP broadcast frames.'
    ],
    correctAnswer: 1,
    explanation: 'NAPT maintains a translation table mapping (Private IP, Private Port) <-> (Public IP, Allocated NAT Port). When returning packets arrive from remote web servers, the router inspects the destination port to route the packet back to the correct internal device.',
    rfcRef: 'RFC 3022 Traditional IP Network Address Translator',
    difficulty: 'Standard'
  },
  {
    id: 'w8-q6',
    week: 8,
    weekTitle: 'IP Forwarding, CIDR & TCAM',
    topic: 'IPv4 Header Checksum',
    question: 'Why does an intermediate router decrementing the TTL field in an IPv4 datagram have to recalculate the IPv4 Header Checksum?',
    options: [
      'Because the checksum covers the entire IP payload and TCP header.',
      'Because the TTL field is located inside the IP header, and modifying TTL changes the header bits, invalidating the previous checksum.',
      'To prevent replay attacks by malicious nodes.',
      'Because RFC 791 requires resetting the checksum to 0x0000 at every hop.'
    ],
    correctAnswer: 1,
    explanation: 'The IPv4 header checksum covers only the IPv4 header fields. Because each router decrements TTL by 1, the header content changes; routers update the checksum (often using an incremental 1s complement update formula: HC\' = HC + 0x0100).',
    difficulty: 'Standard'
  },
  {
    id: 'w8-q7',
    week: 8,
    weekTitle: 'IP Forwarding, CIDR & TCAM',
    topic: 'IPv6 vs IPv4 Architectural Changes',
    question: 'Which IPv4 header field was entirely ELIMINATED in the IPv6 header to accelerate router processing throughput?',
    options: [
      'Hop Limit',
      'Header Checksum',
      'Payload Length',
      'Next Header'
    ],
    correctAnswer: 1,
    explanation: 'IPv6 removed the Header Checksum entirely because error checking is already performed at Layer 2 (Ethernet CRC) and Layer 4 (TCP/UDP checksums). Eliminating it prevents intermediate routers from having to recalculate checksums at every hop when decrementing Hop Limit.',
    rfcRef: 'RFC 8200 IPv6 Specification',
    difficulty: 'Standard'
  },
  {
    id: 'w8-q8',
    week: 8,
    weekTitle: 'IP Forwarding, CIDR & TCAM',
    topic: 'Private IP Address Ranges (RFC 1918)',
    question: 'Which of the following IP address blocks is NOT designated as private non-routable address space under RFC 1918?',
    options: [
      '10.0.0.0/8',
      '172.16.0.0/12',
      '192.168.0.0/16',
      '198.51.100.0/24'
    ],
    correctAnswer: 3,
    explanation: 'RFC 1918 private ranges are: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. 198.51.100.0/24 is reserved for documentation and examples (TEST-NET-2 in RFC 5737).',
    rfcRef: 'RFC 1918',
    difficulty: 'Standard'
  },
  {
    id: 'w8-q9',
    week: 8,
    weekTitle: 'IP Forwarding, CIDR & TCAM',
    topic: 'Subnet Mask Calculation',
    question: 'What is the standard dotted-decimal subnet mask corresponding to a prefix length of /28?',
    options: [
      '255.255.255.240',
      '255.255.255.224',
      '255.255.255.248',
      '255.255.255.192'
    ],
    correctAnswer: 0,
    explanation: '/28 means 28 consecutive 1 bits followed by 4 zero bits: 11111111.11111111.11111111.11110000 = 255.255.255.240.',
    difficulty: 'Standard'
  },
  {
    id: 'w8-q10',
    week: 8,
    weekTitle: 'IP Forwarding, CIDR & TCAM',
    topic: 'Path MTU Discovery (PMTUD)',
    question: 'How does Path MTU Discovery (PMTUD) find the largest allowable packet size along a route without causing IP fragmentation?',
    options: [
      'It sends probe packets with the Don\'t Fragment (DF) bit set to 1; if a router cannot forward the packet without fragmenting, it drops it and returns an ICMP "Fragmentation Needed and DF set" (Type 3, Code 4) message indicating the next-hop MTU.',
      'It queries the DNS root server for the path MTU table.',
      'It increments the TCP window scale option until packet loss occurs.',
      'It inspects the Ethernet preamble length.'
    ],
    correctAnswer: 0,
    explanation: 'PMTUD (RFC 1191) transmits IP datagrams with DF=1. If an intermediate link MTU is too small, the router drops the datagram and returns ICMP Destination Unreachable with Next-Hop MTU, enabling the source to dynamically adjust its segment size.',
    rfcRef: 'RFC 1191 Path MTU Discovery',
    difficulty: 'Advanced'
  },

  // --- WEEK 9: Distance Vector & Link State ---
  {
    id: 'w9-q1',
    week: 9,
    weekTitle: 'Distance Vector & Link State',
    topic: 'Bellman-Ford Distance Vector Equation',
    question: 'What is the Bellman-Ford equation used by Distance Vector routing protocols (e.g. RIP) to compute the minimum distance d_x(y) from node x to node y?',
    options: [
      'd_x(y) = min_v { c(x,v) + d_v(y) } where the minimum is taken over all neighbors v of x',
      'd_x(y) = max_v { c(x,v) - d_v(y) }',
      'd_x(y) = c(x,y) × d_y(x)',
      'd_x(y) = sum_{all v} c(x,v)'
    ],
    correctAnswer: 0,
    explanation: 'The Bellman-Ford optimality principle states that the shortest path from x to y is found by taking the minimum, over all immediate neighbors v, of the link cost from x to v plus neighbor v\'s reported distance to y.',
    difficulty: 'Standard'
  },
  {
    id: 'w9-q2',
    week: 9,
    weekTitle: 'Distance Vector & Link State',
    topic: 'Count to Infinity & Poisoned Reverse',
    question: 'How does the "Poisoned Reverse" heuristic mitigate routing loops between two adjacent routers in Distance Vector protocols?',
    options: [
      'If router Z routes traffic to destination X via router Y, Z advertises to Y that its distance to X is INFINITY (d_z(X) = ∞).',
      'Router Z drops all packets arriving from router Y.',
      'Router Z encrypts its distance vector table using RSA.',
      'Router Z sets its interface bandwidth to zero.'
    ],
    correctAnswer: 0,
    explanation: 'Poisoned reverse prevents 2-node routing loops: if Z routes to X through Y, Z lies to Y by advertising d_z(X) = ∞ so that Y will never attempt to route to X through Z if Y\'s direct link to X fails.',
    rfcRef: 'RFC 1058 Routing Information Protocol (RIP)',
    difficulty: 'Standard'
  },
  {
    id: 'w9-q3',
    week: 9,
    weekTitle: 'Distance Vector & Link State',
    topic: 'Dijkstra SPF Algorithmic Complexity',
    question: 'In a Link-State routing protocol (e.g. OSPF) with n nodes and e edges, what is the computational time complexity of Dijkstra\'s Shortest Path First algorithm when implemented using a binary min-heap priority queue?',
    options: [
      'O(n²)',
      'O((n + e) · log n)',
      'O(n³)',
      'O(e · log e)'
    ],
    correctAnswer: 1,
    explanation: 'With a binary min-heap, extracting the minimum node takes O(log n) n times, and decreasing keys for adjacent edges takes O(log n) e times, yielding total complexity O((n + e) log n).',
    difficulty: 'Advanced'
  },
  {
    id: 'w9-q4',
    week: 9,
    weekTitle: 'Distance Vector & Link State',
    topic: 'Link-State Flooding vs Distance Vector Sharing',
    question: 'Which of the following correctly characterizes the information dissemination difference between Link-State and Distance Vector protocols?',
    options: [
      'Link-State: "tell your neighbors about the entire world"; Distance Vector: "tell the entire world about your neighbors"',
      'Link-State: "tell all nodes about your directly connected neighbors via flooding"; Distance Vector: "tell only your immediate neighbors your estimated distance to all known destinations"',
      'Both protocols broadcast full network topologies to every host on the Internet.',
      'Distance Vector protocols compute Dijkstra SPF trees on every router.'
    ],
    correctAnswer: 1,
    explanation: 'Link-State protocols (OSPF, IS-IS) flood Link State Advertisements (LSAs) containing link states of immediate neighbors to all routers in the area. Distance Vector protocols (RIP) exchange distance vectors only with immediate neighbors.',
    difficulty: 'Standard'
  },
  {
    id: 'w9-q5',
    week: 9,
    weekTitle: 'Distance Vector & Link State',
    topic: 'OSPF Areas and Hierarchical Routing',
    question: 'Why does OSPF partition an Autonomous System into hierarchical Areas (with Area 0 being the Backbone)?',
    options: [
      'To enforce BGP peering restrictions across continents.',
      'To restrict LSA flooding and SPF tree recalculations within local area boundaries, reducing memory overhead and routing convergence churn on large enterprise networks.',
      'To convert all IPv4 routing tables into flat MAC address tables.',
      'To disable packet forwarding during maintenance.'
    ],
    correctAnswer: 1,
    explanation: 'In large networks with thousands of routers, running Dijkstra across the whole graph on every link flap causes high CPU load. OSPF Area Border Routers (ABRs) summarize routes between areas, isolating internal topology changes.',
    rfcRef: 'RFC 2328 OSPF Version 2',
    difficulty: 'Standard'
  },
  {
    id: 'w9-q6',
    week: 9,
    weekTitle: 'Distance Vector & Link State',
    topic: 'RIP Infinity Value',
    question: 'In the Routing Information Protocol (RIP), what metric value is defined as "infinity" (unreachable)?',
    options: [
      '15',
      '16',
      '255',
      '65,535'
    ],
    correctAnswer: 1,
    explanation: 'RIP defines a maximum hop count of 15. A metric of 16 signifies infinity/unreachable, limiting the protocol to networks with a maximum diameter of 15 hops to prevent count-to-infinity loops from persisting indefinitely.',
    rfcRef: 'RFC 1058',
    difficulty: 'Standard'
  },
  {
    id: 'w9-q7',
    week: 9,
    weekTitle: 'Distance Vector & Link State',
    topic: 'Dijkstra Loop Prevention',
    question: 'Why are Link-State protocols inherently immune to the count-to-infinity problem that plagues Distance Vector protocols?',
    options: [
      'Because every router independently possesses an identical, complete map of the entire network topology graph and computes loop-free shortest paths directly using Dijkstra\'s algorithm.',
      'Because Link-State routers drop packets with odd TTL values.',
      'Because OSPF uses TCP connections for all data forwarding.',
      'Because Link-State protocols do not use IP addresses.'
    ],
    correctAnswer: 0,
    explanation: 'In Link-State routing, every node builds an identical Link State Database (LSDB) representing the complete network graph. Because shortest path trees are computed globally on true topology rather than secondhand rumors, count-to-infinity cannot occur.',
    difficulty: 'Standard'
  },
  {
    id: 'w9-q8',
    week: 9,
    weekTitle: 'Distance Vector & Link State',
    topic: 'Link-State LSA Sequence Number Wraparound',
    question: 'How do OSPF routers ensure old or corrupt Link State Advertisements (LSAs) are rejected and sequence numbers do not fail upon wraparound?',
    options: [
      'By using a signed 32-bit linear sequence number starting at 0x80000001, combined with MaxAge (3600 seconds) aging timers.',
      'By resetting all router hardware daily at midnight.',
      'By relying on DNS TTL expiration.',
      'By requiring manual administrator approval for every LSA.'
    ],
    correctAnswer: 0,
    explanation: 'OSPF uses a signed 32-bit integer for LSA sequence numbers beginning at 0x80000001 (-2,147,483,647) up to 0x7FFFFFFF (+2,147,483,647). Each LSA also carries an age field incremented every second; when it reaches MaxAge (1 hour), it is flushed.',
    rfcRef: 'RFC 2328 Section 12.1.6',
    difficulty: 'Rigorous'
  },
  {
    id: 'w9-q9',
    week: 9,
    weekTitle: 'Distance Vector & Link State',
    topic: 'Routing Convergence Time',
    question: 'What does the term "Routing Convergence" signify in internetwork routing?',
    options: [
      'The time taken for all routers on the network to achieve a consistent, accurate view of topology and forwarding paths following a topology change.',
      'The time required to establish a TCP 3-way handshake.',
      'The merging of IPv4 and IPv6 protocols into a single stack.',
      'The conversion of electrical signals into optical pulses.'
    ],
    correctAnswer: 0,
    explanation: 'Convergence is the state where all routing tables across an autonomous system have updated and stabilized with valid loop-free routes following changes like link failure or node addition.',
    difficulty: 'Standard'
  },
  {
    id: 'w9-q10',
    week: 9,
    weekTitle: 'Distance Vector & Link State',
    topic: 'Equal-Cost Multi-Path (ECMP)',
    question: 'What is Equal-Cost Multi-Path (ECMP) routing?',
    options: [
      'A routing strategy where traffic between source and destination is load-balanced across multiple parallel paths that share the identical minimal metric cost.',
      'A mechanism that forces all packets to take the most expensive route to maximize ISP revenue.',
      'A protocol that alternates between circuit switching and packet switching.',
      'A method to encrypt packets on secondary links.'
    ],
    correctAnswer: 0,
    explanation: 'When Dijkstra produces multiple next-hops with identical minimum metric cost to a destination, ECMP allows the router to split outbound flow traffic across all equal paths using packet header hashing (5-tuple).',
    difficulty: 'Standard'
  },

  // --- WEEK 10: BGP, AS Policy & ICMPv6 ---
  {
    id: 'w10-q1',
    week: 10,
    weekTitle: 'BGP, AS Policy & ICMPv6',
    topic: 'BGP AS-PATH Loop Prevention',
    question: 'How does Border Gateway Protocol (BGP-4) detect and prevent inter-domain routing loops when advertising prefix reachability across Autonomous Systems (AS)?',
    options: [
      'By running Dijkstra\'s algorithm across the entire global Internet graph.',
      'By prepending its own AS number to the AS-PATH attribute list; if a border router sees its own AS number in the advertised AS-PATH of an incoming route, it discards the route.',
      'By dropping packets whose TTL exceeds 64.',
      'By enforcing a maximum hop count of 16 AS hops.'
    ],
    correctAnswer: 1,
    explanation: 'BGP is a Path-Vector protocol. As an UPDATE message propagates across AS boundaries, each AS prepends its Autonomous System Number (ASN) to the AS-PATH attribute. If an AS receives an advertisement containing its own ASN, it knows accepting it would create a routing loop and drops it.',
    rfcRef: 'RFC 4271 BGP-4',
    difficulty: 'Standard'
  },
  {
    id: 'w10-q2',
    week: 10,
    weekTitle: 'BGP, AS Policy & ICMPv6',
    topic: 'eBGP vs iBGP Sessions',
    question: 'What is the fundamental difference in purpose and connectivity between external BGP (eBGP) and internal BGP (iBGP)?',
    options: [
      'eBGP runs between border routers of different Autonomous Systems (typically over direct physical links); iBGP distributes external BGP routes among routers within the same Autonomous System.',
      'eBGP uses UDP port 179; iBGP uses TCP port 80.',
      'eBGP only supports IPv4; iBGP only supports IPv6.',
      'eBGP modifies IP packet headers; iBGP modifies Ethernet MAC addresses.'
    ],
    correctAnswer: 0,
    explanation: 'eBGP peers reside in different ASes and exchange inter-domain reachability. iBGP peers reside within the same AS to distribute learned BGP routes internally so all ingress/egress routers know how to forward transit and outbound traffic.',
    difficulty: 'Standard'
  },
  {
    id: 'w10-q3',
    week: 10,
    weekTitle: 'BGP, AS Policy & ICMPv6',
    topic: 'BGP Route Selection Decision Order',
    question: 'When a BGP router receives multiple valid routes to the exact same destination prefix, which attribute is evaluated FIRST in the standard BGP route selection decision process?',
    options: [
      'Shortest AS-PATH length',
      'Highest LOCAL-PREF (Local Preference)',
      'Lowest Multi-Exit Discriminator (MED)',
      'Lowest Router ID'
    ],
    correctAnswer: 1,
    explanation: 'The BGP decision process evaluates in order: 1) Highest Weight (Cisco-specific); 2) Highest LOCAL-PREF (RFC standard); 3) Locally originated routes; 4) Shortest AS-PATH; 5) Lowest Origin type (IGP < EGP < INCOMPLETE); 6) Lowest MED; 7) eBGP over iBGP; 8) Lowest IGP metric to NEXT-HOP; 9) Lowest BGP Router ID.',
    rfcRef: 'RFC 4271 Section 9.1.2',
    difficulty: 'Advanced'
  },
  {
    id: 'w10-q4',
    week: 10,
    weekTitle: 'BGP, AS Policy & ICMPv6',
    topic: 'Gao-Rexford AS Commercial Relationships',
    question: 'Under standard Gao-Rexford commercial peering rules in inter-domain routing, which routes will a transit customer AS willingly export to its peers and providers?',
    options: [
      'All routes received from all providers.',
      'Only its own internal routes and routes belonging to its direct customers (it will never provide free transit between its competitors/providers).',
      'Every route present in the global default-free zone.',
      'No routes whatsoever.'
    ],
    correctAnswer: 1,
    explanation: 'Gao-Rexford model: an AS provides transit only for customers who pay it. An AS advertises customer routes to providers and peers, but never advertises routes learned from one provider/peer to another provider/peer ("No-Valley routing").',
    difficulty: 'Rigorous'
  },
  {
    id: 'w10-q5',
    week: 10,
    weekTitle: 'BGP, AS Policy & ICMPv6',
    topic: 'ICMPv6 Neighbor Discovery Protocol (NDP)',
    question: 'IPv6 completely eliminated IPv4\'s broadcast ARP protocol. Which ICMPv6 messages are used by nodes to resolve a target IPv6 address into a Link-Layer MAC address?',
    options: [
      'Neighbor Solicitation (NS) and Neighbor Advertisement (NA)',
      'Router Solicitation (RS) and Router Advertisement (RA)',
      'Echo Request and Echo Reply',
      'Packet Too Big and Time Exceeded'
    ],
    correctAnswer: 0,
    explanation: 'NDP (RFC 4861) replaces ARP. A host sends a multicast Neighbor Solicitation (NS) to the target\'s solicited-node multicast address; the target replies with a unicast Neighbor Advertisement (NA) containing its link-layer MAC address.',
    rfcRef: 'RFC 4861 Neighbor Discovery for IP version 6',
    difficulty: 'Standard'
  },
  {
    id: 'w10-q6',
    week: 10,
    weekTitle: 'BGP, AS Policy & ICMPv6',
    topic: 'BGP Transport Protocol',
    question: 'Which underlying transport protocol and port does BGP use to establish reliable peer sessions?',
    options: [
      'UDP port 520',
      'TCP port 179',
      'SCTP port 80',
      'Raw IP protocol 89'
    ],
    correctAnswer: 1,
    explanation: 'Unlike OSPF (which runs directly on IP protocol 89) or RIP (which runs over UDP 520), BGP uses TCP on well-known port 179 to guarantee reliable, ordered in-sequence delivery of update messages.',
    rfcRef: 'RFC 4271',
    difficulty: 'Standard'
  },
  {
    id: 'w10-q7',
    week: 10,
    weekTitle: 'BGP, AS Policy & ICMPv6',
    topic: 'BGP Multi-Exit Discriminator (MED)',
    question: 'What is the purpose of the Multi-Exit Discriminator (MED) attribute in BGP?',
    options: [
      'To convey to an external neighboring AS which ingress link is preferred when multiple entry points exist between the two ASes.',
      'To encrypt BGP update messages with TLS.',
      'To limit the maximum number of hops a packet can travel.',
      'To specify the OSPF area number.'
    ],
    correctAnswer: 0,
    explanation: 'MED is an optional non-transitive attribute advertised to external peers to suggest a preferred entry point into the advertising AS when multiple peering links exist.',
    difficulty: 'Standard'
  },
  {
    id: 'w10-q8',
    week: 10,
    weekTitle: 'BGP, AS Policy & ICMPv6',
    topic: 'IPv6 SLAAC (Stateless Address Autoconfiguration)',
    question: 'In IPv6 Stateless Address Autoconfiguration (SLAAC), how does a host determine its global IPv6 address without a stateful DHCPv6 server?',
    options: [
      'By receiving a Router Advertisement (RA) with the network prefix and combining it with a 64-bit Interface Identifier (such as modified EUI-64 or randomized privacy extension).',
      'By asking the root DNS server for a leased IP.',
      'By generating a random 32-bit integer and sending an ARP request.',
      'By reading its hard drive serial number.'
    ],
    correctAnswer: 0,
    explanation: 'In SLAAC (RFC 4862), the host sends a Router Solicitation (RS) and receives a Router Advertisement (RA) containing the /64 subnet prefix. It then synthesizes the host portion using EUI-64 (derived from MAC) or RFC 4941 privacy extensions, followed by Duplicate Address Detection (DAD).',
    rfcRef: 'RFC 4862 IPv6 SLAAC',
    difficulty: 'Advanced'
  },
  {
    id: 'w10-q9',
    week: 10,
    weekTitle: 'BGP, AS Policy & ICMPv6',
    topic: 'iBGP Full Mesh & Route Reflectors',
    question: 'Why does an Autonomous System without Route Reflectors require a full mesh of iBGP sessions between all internal BGP routers?',
    options: [
      'Because iBGP routers never re-advertise routes learned from one iBGP peer to another iBGP peer (iBGP split-horizon rule to prevent loops).',
      'Because TCP does not support multiple sockets.',
      'Because Ethernet cables cannot carry BGP packets.',
      'To double the maximum transmission unit.'
    ],
    correctAnswer: 0,
    explanation: 'Unlike eBGP which uses AS-PATH to detect loops, iBGP does not change the AS-PATH within an AS. To prevent loops, iBGP enforces split horizon: a route learned via iBGP is never forwarded to another iBGP peer. Hence, all iBGP speakers must be directly peered (full mesh) or use Route Reflectors (RFC 4456).',
    difficulty: 'Rigorous'
  },
  {
    id: 'w10-q10',
    week: 10,
    weekTitle: 'BGP, AS Policy & ICMPv6',
    topic: 'ICMPv6 Packet Too Big & Path MTU',
    question: 'Because IPv6 intermediate routers NEVER fragment packets in transit, what happens when an IPv6 datagram exceeds an outgoing link\'s MTU?',
    options: [
      'The router drops the datagram and returns an ICMPv6 Type 2 "Packet Too Big" message containing the link\'s MTU to the originating source host.',
      'The router stores the packet in permanent flash memory until bandwidth clears.',
      'The router truncates the packet to 512 bytes and forwards it anyway.',
      'The router switches the link to analog modem mode.'
    ],
    correctAnswer: 0,
    explanation: 'IPv6 requires all fragmentation to be performed exclusively at the source host. If a packet is too large, routers drop it and transmit an ICMPv6 Packet Too Big (PTB) error with the MTU of the constrained link, forcing the source to fragment or reduce MSS.',
    rfcRef: 'RFC 8200 & RFC 4443',
    difficulty: 'Standard'
  },

  // --- WEEK 11: Link Layer, MAC & CSMA/CD ---
  {
    id: 'w11-q1',
    week: 11,
    weekTitle: 'Link Layer, MAC & CSMA/CD',
    topic: 'Ethernet Minimum Frame Size in CSMA/CD',
    question: 'In classic half-duplex Ethernet (10 Mbps) using CSMA/CD over a 2.5 km bus network with round-trip propagation time 2τ ≈ 51.2 μs, why is the minimum frame size strictly set to 64 bytes (512 bits)?',
    options: [
      'To ensure that the transmitting host is still transmitting when a collision reflection from the farthest end of the cable returns to it, guaranteeing collision detection.',
      'To provide space for storing encrypted TLS certificates.',
      'Because 64 is the square root of 4,096.',
      'To prevent the receiver clock from drifting.'
    ],
    correctAnswer: 0,
    explanation: 'For CSMA/CD to work, a sender must detect a collision before it finishes transmitting its frame. Transmission time must satisfy: T_trans >= 2 * T_prop. At 10 Mbps: 512 bits / 10 Mbps = 51.2 μs = 2τ (slot time). If frames were shorter, a collision could occur after transmission finished, causing undetected silent packet corruption.',
    rfcRef: 'IEEE 802.3 Standard',
    difficulty: 'Advanced'
  },
  {
    id: 'w11-q2',
    week: 11,
    weekTitle: 'Link Layer, MAC & CSMA/CD',
    topic: 'Binary Exponential Backoff Algorithm',
    question: 'In Ethernet CSMA/CD, after experiencing m collisions (up to m = 10), from which discrete set of values does an adapter choose its random backoff multiplier K (where backoff time is K × 51.2 μs)?',
    options: [
      'K is chosen uniformly from { 0, 1, 2, ..., 2^m - 1 }',
      'K is chosen from { 1, 2, 3, ..., m }',
      'K is always equal to 2^m',
      'K is randomly either 0 or 1 regardless of collision count'
    ],
    correctAnswer: 0,
    explanation: 'Binary Exponential Backoff dynamically adjusts to network contention: after m collisions, K is chosen uniformly at random from {0, 1, ..., 2^m - 1}. For m=1, K in {0,1}; for m=2, K in {0,1,2,3}; capped at m=10 (K in {0..1023}).',
    difficulty: 'Standard'
  },
  {
    id: 'w11-q3',
    week: 11,
    weekTitle: 'Link Layer, MAC & CSMA/CD',
    topic: 'CRC Polynomial Division Remainder',
    question: 'Suppose data D = 101110 and generator polynomial G = 1001 (r = 3 bits of CRC). Appending r zeros to D yields 101110000. What is the CRC remainder R computed via modulo-2 binary division (XOR)?',
    options: [
      '011',
      '100',
      '001',
      '110'
    ],
    correctAnswer: 0,
    explanation: 'Performing modulo-2 division of 101110000 by 1001:\n101110000 XOR (1001 << 5 = 100100000) -> 001010000\n1010000 XOR (1001 << 3 = 1001000) -> 0011000\n11000 XOR (1001 << 1 = 10010) -> 01010\n1010 XOR 1001 -> 011.\nThe remainder R is 011.',
    difficulty: 'Rigorous'
  },
  {
    id: 'w11-q4',
    week: 11,
    weekTitle: 'Link Layer, MAC & CSMA/CD',
    topic: 'CSMA/CA vs CSMA/CD in Wi-Fi',
    question: 'Why does IEEE 802.11 Wireless LAN (Wi-Fi) use Collision Avoidance (CSMA/CA) instead of Ethernet\'s Collision Detection (CSMA/CD)?',
    options: [
      'Because wireless adapters transmit at high power, blinding their own receivers and preventing reliable detection of weak collision signals while transmitting; plus hidden terminal problems occur.',
      'Because radio signals travel faster than light.',
      'Because wireless networks cannot transmit binary digits.',
      'Because CSMA/CD was patented by IBM.'
    ],
    correctAnswer: 0,
    explanation: 'In wireless communications: 1) local transmit power drowns out any colliding signal from distant nodes (dynamic range issue); 2) hidden terminal problem means collisions happen at the receiver even if neither transmitter hears each other.',
    difficulty: 'Standard'
  },
  {
    id: 'w11-q5',
    week: 11,
    weekTitle: 'Link Layer, MAC & CSMA/CD',
    topic: 'Slotted ALOHA Maximum Efficiency',
    question: 'What is the theoretical maximum channel efficiency of the Slotted ALOHA random access protocol as the number of active nodes N approaches infinity?',
    options: [
      '100%',
      '1 / e ≈ 36.8%',
      '1 / (2e) ≈ 18.4%',
      '50.0%'
    ],
    correctAnswer: 1,
    explanation: 'In Slotted ALOHA, probability of a successful slot is N * p * (1 - p)^(N-1). Setting derivative to 0 yields optimal p = 1/N. As N -> infinity, (1 - 1/N)^N -> 1/e ≈ 0.368 (36.8%). In Pure (unslotted) ALOHA, it is 1/(2e) ≈ 18.4%.',
    difficulty: 'Advanced'
  },
  {
    id: 'w11-q6',
    week: 11,
    weekTitle: 'Link Layer, MAC & CSMA/CD',
    topic: 'MAC Address Structure & OUI',
    question: 'In a standard 48-bit IEEE 802 MAC address (e.g. 00:1A:2B:3C:4D:5E), what do the first 24 bits (3 octets) signify?',
    options: [
      'The Organizationally Unique Identifier (OUI) assigned to the hardware manufacturer by the IEEE.',
      'The geographic ZIP code of the network adapter factory.',
      'The default gateway IPv4 address in hexadecimal.',
      'The cryptographic hash of the user\'s password.'
    ],
    correctAnswer: 0,
    explanation: 'The first 24 bits of a MAC address are the Organizationally Unique Identifier (OUI) purchased by hardware vendors from IEEE (e.g. 00:1A:2B), while the remaining 24 bits are assigned uniquely per NIC.',
    difficulty: 'Standard'
  },
  {
    id: 'w11-q7',
    week: 11,
    weekTitle: 'Link Layer, MAC & CSMA/CD',
    topic: 'Collision Domain Separation',
    question: 'Which device separates collision domains on every single physical port?',
    options: [
      'Layer 1 Passive Hub',
      'Layer 1 Repeater',
      'Layer 2 Ethernet Switch',
      'Coaxial BNC T-connector'
    ],
    correctAnswer: 2,
    explanation: 'Hubs and repeaters simply amplify and mirror electrical signals to all ports (one single shared collision domain). An Ethernet switch buffers incoming frames and forwards them only to the destination port, isolating each port into its own dedicated collision domain.',
    difficulty: 'Standard'
  },
  {
    id: 'w11-q8',
    week: 11,
    weekTitle: 'Link Layer, MAC & CSMA/CD',
    topic: 'Hamming Code Error Correction',
    question: 'What is the minimum Hamming distance d_min required in an error-control code to DETECT up to d errors and CORRECT up to t errors?',
    options: [
      'Detect d errors: d_min >= d + 1; Correct t errors: d_min >= 2t + 1',
      'Detect d errors: d_min >= d; Correct t errors: d_min >= t',
      'Detect d errors: d_min >= 2d; Correct t errors: d_min >= t + 1',
      'Detect d errors: d_min >= d - 1; Correct t errors: d_min >= 2t'
    ],
    correctAnswer: 0,
    explanation: 'To detect d bit flips, invalid codewords must be separated from valid codewords by at least d + 1. To correct t errors, spheres of radius t around valid codewords must not overlap, requiring d_min >= 2t + 1.',
    difficulty: 'Advanced'
  },
  {
    id: 'w11-q9',
    week: 11,
    weekTitle: 'Link Layer, MAC & CSMA/CD',
    topic: 'CSMA Persistence Strategies',
    question: 'How does 1-persistent CSMA behave when a node has a packet ready to transmit and senses the channel as busy?',
    options: [
      'It waits a random backoff time before sensing again.',
      'It continuously monitors the channel and transmits immediately with probability 1 the instant the channel becomes idle.',
      'It discards the packet permanently.',
      'It switches to circuit switched frequency division.'
    ],
    correctAnswer: 1,
    explanation: 'In 1-persistent CSMA, a station wanting to transmit senses the medium: if busy, it continuously listens; the very instant it becomes idle, it transmits with probability 1. (This can lead to collisions if two nodes were both waiting for idle).',
    difficulty: 'Standard'
  },
  {
    id: 'w11-q10',
    week: 11,
    weekTitle: 'Link Layer, MAC & CSMA/CD',
    topic: 'Ethernet Jam Signal Purpose',
    question: 'In CSMA/CD, what is the role of the 32-to-48 bit "Jam Signal" transmitted by an adapter upon detecting a collision?',
    options: [
      'To ensure all other transmitting stations on the shared wire also detect the collision and abort their transmissions.',
      'To reboot the remote computer.',
      'To request an IP lease from DHCP.',
      'To negotiate duplex settings.'
    ],
    correctAnswer: 0,
    explanation: 'When an adapter detects a collision while transmitting, it immediately stops sending frame bits and transmits a 32-to-48 bit jam signal to ensure all other active transmitters on the wire recognize that a collision occurred and back off.',
    difficulty: 'Standard'
  },

  // --- WEEK 12: Ethernet, ARP & VLANs ---
  {
    id: 'w12-q1',
    week: 12,
    weekTitle: 'Ethernet, ARP & VLANs',
    topic: 'Self-Learning Switch Forwarding Table',
    question: 'How does a transparent Ethernet switch populate its MAC address forwarding table (Filtering Database)?',
    options: [
      'It inspects the SOURCE MAC address of every incoming frame and records (Source MAC, Ingress Port, Timestamp) in its table.',
      'It broadcasts an ARP request to all ports upon powering up.',
      'The network administrator must manually type every MAC address into the switch firmware.',
      'It runs OSPF across all connected computers.'
    ],
    correctAnswer: 0,
    explanation: 'Transparent switches are "self-learning": when a frame arrives on port X, the switch examines the frame\'s SOURCE MAC address. It associates that MAC address with port X in its forwarding table. Future frames destined for that MAC will be switched directly to port X instead of flooded.',
    rfcRef: 'IEEE 802.1D Spanning Tree & Bridging',
    difficulty: 'Standard'
  },
  {
    id: 'w12-q2',
    week: 12,
    weekTitle: 'Ethernet, ARP & VLANs',
    topic: 'ARP Query Broadcast vs Unicast Response',
    question: 'When Host A needs to send an IP packet to Host B on the same local subnet and doesn\'t have Host B\'s MAC in its ARP table, how are the ARP Request and ARP Reply transmitted?',
    options: [
      'ARP Request: Broadcast (FF:FF:FF:FF:FF:FF); ARP Reply: Unicast directly to Host A\'s MAC address',
      'ARP Request: Unicast; ARP Reply: Broadcast',
      'Both Request and Reply are Broadcast',
      'Both Request and Reply are sent via TCP handshake'
    ],
    correctAnswer: 0,
    explanation: 'Host A broadcasts `ARP who-has IP_B tell IP_A` to Ethernet broadcast address FF:FF:FF:FF:FF:FF so every host on the broadcast domain receives it. Host B recognizes its own IP, caches Host A\'s mapping, and sends a unicast ARP reply directly to Host A\'s MAC address.',
    rfcRef: 'RFC 826 Address Resolution Protocol',
    difficulty: 'Standard'
  },
  {
    id: 'w12-q3',
    week: 12,
    weekTitle: 'Ethernet, ARP & VLANs',
    topic: 'IEEE 802.1Q VLAN Tagging',
    question: 'In an enterprise network with multiple Virtual LANs (VLANs), what does an IEEE 802.1Q tag add to an Ethernet frame across a switch trunk link?',
    options: [
      'A 4-byte tag header containing TPID (0x8100) and a 12-bit VLAN Identifier (VID), allowing up to 4,094 distinct VLANs.',
      'An encrypted 256-bit IPsec authentication hash.',
      'A BGP route attribute list.',
      'A 64-byte payload padding.'
    ],
    correctAnswer: 0,
    explanation: '802.1Q inserts a 4-byte tag between Source MAC and EtherType: 2 bytes of Tag Protocol Identifier (0x8100) and 2 bytes of Tag Control Information containing 3-bit Priority Code Point (PCP) and 12-bit VLAN ID (VID: 1 to 4094).',
    rfcRef: 'IEEE 802.1Q',
    difficulty: 'Standard'
  },
  {
    id: 'w12-q4',
    week: 12,
    weekTitle: 'Ethernet, ARP & VLANs',
    topic: 'Spanning Tree Protocol (STP)',
    question: 'What catastrophe does the Spanning Tree Protocol (IEEE 802.1D / 802.1w RSTP) prevent in bridged Ethernet networks with redundant physical links?',
    options: [
      'Broadcast Storms, multiple frame copies, and MAC address table instability (churn) caused by physical switching loops.',
      'Unauthorized access to the root password.',
      'Overheating of copper cables due to high voltage.',
      'DNS cache poisoning.'
    ],
    correctAnswer: 0,
    explanation: 'Ethernet frames lack a TTL field. In a topology loop, broadcast frames (like ARP) circulate endlessly, multiplying exponentially on every switch (Broadcast Storm) and thrashing switch MAC tables until network links saturate completely. STP disables redundant links to enforce a tree topology.',
    rfcRef: 'IEEE 802.1D',
    difficulty: 'Standard'
  },
  {
    id: 'w12-q5',
    week: 12,
    weekTitle: 'Ethernet, ARP & VLANs',
    topic: 'Inter-VLAN Routing (Router on a Stick)',
    question: 'How do hosts belonging to different VLANs (e.g. VLAN 10 Accounting and VLAN 20 Engineering) communicate with each other?',
    options: [
      'They can communicate directly through Layer 2 switches without any routing.',
      'Traffic must traverse a Layer 3 device (such as a router with sub-interfaces or a Layer 3 multilayer switch) because each VLAN represents an independent broadcast domain and IP subnet.',
      'By turning on CSMA/CD on their network cards.',
      'By sending UDP broadcast packets to 255.255.255.255.'
    ],
    correctAnswer: 1,
    explanation: 'VLANs create separate logical broadcast domains and subnets. Traffic cannot cross VLAN boundaries at Layer 2. Inter-VLAN routing requires a Layer 3 device ("router on a stick" via an 802.1Q trunk or SVI on a Layer 3 switch) to route between the subnets.',
    difficulty: 'Standard'
  },
  {
    id: 'w12-q6',
    week: 12,
    weekTitle: 'Ethernet, ARP & VLANs',
    topic: 'ARP Spoofing / Poisoning Attack',
    question: 'What vulnerability in the ARP protocol allows a malicious host to execute an ARP Poisoning (Man-in-the-Middle) attack on a local network?',
    options: [
      'ARP lacks authentication; hosts accept and cache unsolicited ARP replies without verifying if a matching query was ever sent, allowing an attacker to associate the default gateway\'s IP with their own MAC address.',
      'ARP uses plain-text passwords stored in BIOS.',
      'ARP packets can be routed across the Internet without BGP.',
      'ARP only works on fiber optic cables.'
    ],
    correctAnswer: 0,
    explanation: 'ARP is stateless and unauthenticated: devices trust and overwrite their local ARP tables with gratuitous or fake ARP replies. An attacker claiming `Gateway IP is at Attacker MAC` redirects all outbound subnet traffic through their machine.',
    difficulty: 'Standard'
  },
  {
    id: 'w12-q7',
    week: 12,
    weekTitle: 'Ethernet, ARP & VLANs',
    topic: 'STP Bridge Protocol Data Units (BPDUs)',
    question: 'How do switches running Spanning Tree Protocol elect the Root Bridge of the network?',
    options: [
      'The switch with the lowest Bridge ID (combining configurable Bridge Priority and MAC address) is elected Root Bridge through BPDU exchanges.',
      'The switch with the highest IP address is elected.',
      'The switch that has been powered on for the longest duration.',
      'The switch with the highest link bandwidth.'
    ],
    correctAnswer: 0,
    explanation: 'Switches exchange BPDUs containing Bridge IDs (2-byte priority + 6-byte MAC). The switch with the numerically lowest Bridge ID wins the root election. Network administrators configure lower priority (e.g., 4096 vs default 32768) on core switches.',
    rfcRef: 'IEEE 802.1D Section 8',
    difficulty: 'Standard'
  },
  {
    id: 'w12-q8',
    week: 12,
    weekTitle: 'Ethernet, ARP & VLANs',
    topic: 'Switch Unknown Unicast Flooding',
    question: 'What action does an Ethernet switch take when it receives a unicast frame whose destination MAC address is NOT currently present in its MAC forwarding table?',
    options: [
      'It discards the frame immediately.',
      'It floods the frame out of all ports EXCEPT the incoming port on which it was received (Unknown Unicast Flooding).',
      'It sends an ICMP Host Unreachable packet.',
      'It buffers the frame in permanent storage until the destination appears.'
    ],
    correctAnswer: 1,
    explanation: 'When the destination MAC is unknown, the switch behaves like a hub for that single frame: it floods the frame out of all active ports on that VLAN except the arrival port, ensuring the destination receives it and replies so the switch can learn its location.',
    difficulty: 'Standard'
  },
  {
    id: 'w12-q9',
    week: 12,
    weekTitle: 'Ethernet, ARP & VLANs',
    topic: 'Gratuitous ARP',
    question: 'What is a "Gratuitous ARP" message, and what are its two primary operational uses?',
    options: [
      'An ARP request or reply where a host queries its own IP address to detect IP address conflicts and update neighbors\' ARP caches after a hardware NIC replacement or failover.',
      'An ARP packet sent to request a DHCP lease.',
      'An ARP message that resets the router password.',
      'An ARP packet that tests line voltage.'
    ],
    correctAnswer: 0,
    explanation: 'Gratuitous ARP has source IP = target IP: 1) if another host replies, an IP address conflict is detected; 2) if a server with redundant NICs fails over, sending gratuitous ARP forces switches to update their MAC tables to point to the new port.',
    rfcRef: 'RFC 5227 IPv4 Address Conflict Detection',
    difficulty: 'Standard'
  },
  {
    id: 'w12-q10',
    week: 12,
    weekTitle: 'Ethernet, ARP & VLANs',
    topic: 'Broadcast Domain Boundaries',
    question: 'Which of the following devices does NOT forward Layer 2 broadcast frames (destination MAC FF:FF:FF:FF:FF:FF) under default configuration?',
    options: [
      'Ethernet Hub',
      'Unmanaged Layer 2 Ethernet Switch',
      'Layer 3 IP Router',
      'Coaxial 10BASE2 tap'
    ],
    correctAnswer: 2,
    explanation: 'Hubs, switches, and repeaters forward broadcast frames to all ports in the broadcast domain. A Layer 3 router terminates the broadcast domain; by default, it does not forward broadcast packets across network interfaces.',
    difficulty: 'Standard'
  }
];

export const DEMO_SESSIONS: PracticeSession[] = [
  {
    id: '101',
    userId: 'user-1',
    userName: 'User 1 (Abhijeet G.)',
    userLabel: 'User 1',
    timestamp: Date.now() - 3600 * 1000 * 4,
    formattedDate: 'Today, 14:22',
    mode: 'quick_20',
    modeTitle: 'Quick Practice (20 MCQs)',
    subTitle: 'Cross-Week Sampling',
    questionIds: ['w1-q1', 'w1-q2', 'w2-q1', 'w2-q2', 'w3-q1', 'w3-q2', 'w4-q1', 'w4-q2', 'w5-q1', 'w5-q2', 'w6-q1', 'w6-q2', 'w7-q1', 'w7-q2', 'w8-q1', 'w8-q2', 'w9-q1', 'w9-q2', 'w10-q1', 'w10-q2'],
    userAnswers: {
      'w1-q1': 0,
      'w1-q2': 1,
      'w2-q1': 1,
      'w2-q2': 1,
      'w3-q1': 1,
      'w3-q2': 1,
      'w4-q1': 1,
      'w4-q2': 0, // incorrect
      'w5-q1': 1,
      'w5-q2': 1,
      'w6-q1': 0,
      'w6-q2': 1,
      'w7-q1': 1,
      'w7-q2': 0, // incorrect
      'w8-q1': 2,
      'w8-q2': 0,
      'w9-q1': 0,
      'w9-q2': 0,
      'w10-q1': 1,
      'w10-q2': 0
    },
    flaggedIds: ['w7-q1', 'w4-q2'],
    totalQuestions: 20,
    score: 18,
    accuracy: 90.0,
    durationSeconds: 702, // 11m 42s
    completed: true
  },
  {
    id: '102',
    userId: 'user-1',
    userName: 'User 1 (Abhijeet G.)',
    userLabel: 'User 1',
    timestamp: Date.now() - 3600 * 1000 * 24,
    formattedDate: 'Yesterday, 19:04',
    mode: 'week_2',
    modeTitle: 'Week 02: OSI & Layer Architecture',
    subTitle: 'Curricular Drill',
    weekNumber: 2,
    questionIds: ['w2-q1', 'w2-q2', 'w2-q3', 'w2-q4', 'w2-q5', 'w2-q6', 'w2-q7', 'w2-q8', 'w2-q9', 'w2-q10'],
    userAnswers: {
      'w2-q1': 1, 'w2-q2': 1, 'w2-q3': 1, 'w2-q4': 2, 'w2-q5': 2,
      'w2-q6': 0, 'w2-q7': 1, 'w2-q8': 1, 'w2-q9': 1, 'w2-q10': 1
    },
    flaggedIds: [],
    totalQuestions: 10,
    score: 10,
    accuracy: 100.0,
    durationSeconds: 318, // 05m 18s
    completed: true
  },
  {
    id: '103',
    userId: 'user-1',
    userName: 'User 1 (Abhijeet G.)',
    userLabel: 'User 1',
    timestamp: Date.now() - 3600 * 1000 * 48,
    formattedDate: '2 days ago, 11:15',
    mode: 'week_1',
    modeTitle: 'Week 01: Fundamentals & Switching',
    subTitle: 'Curricular Drill',
    weekNumber: 1,
    questionIds: ['w1-q1', 'w1-q2', 'w1-q3', 'w1-q4', 'w1-q5', 'w1-q6', 'w1-q7', 'w1-q8', 'w1-q9', 'w1-q10'],
    userAnswers: {
      'w1-q1': 0, 'w1-q2': 1, 'w1-q3': 2, 'w1-q4': 1, 'w1-q5': 1,
      'w1-q6': 1, 'w1-q7': 0, 'w1-q8': 1, 'w1-q9': 2, 'w1-q10': 1
    },
    flaggedIds: ['w1-q4'],
    totalQuestions: 10,
    score: 9,
    accuracy: 90.0,
    durationSeconds: 362, // 06m 02s
    completed: true
  },
  {
    id: '104',
    userId: 'user-2',
    userName: 'User 2 (Candidate Dev)',
    userLabel: 'User 2',
    timestamp: Date.now() - 3600 * 1000 * 72,
    formattedDate: '3 days ago, 22:40',
    mode: 'week_3',
    modeTitle: 'Week 03: HTTP/1.1 & DNS Resolution',
    subTitle: 'Curricular Drill',
    weekNumber: 3,
    questionIds: ['w3-q1', 'w3-q2', 'w3-q3', 'w3-q4', 'w3-q5', 'w3-q6', 'w3-q7', 'w3-q8', 'w3-q9', 'w3-q10'],
    userAnswers: {
      'w3-q1': 1, 'w3-q2': 1, 'w3-q3': 0, 'w3-q4': 0, 'w3-q5': 0,
      'w3-q6': 1, 'w3-q7': 1, 'w3-q8': 1, 'w3-q9': 0, 'w3-q10': 1
    },
    flaggedIds: ['w3-q5', 'w3-q9'],
    totalQuestions: 10,
    score: 8,
    accuracy: 80.0,
    durationSeconds: 451, // 07m 31s
    completed: true
  }
];
