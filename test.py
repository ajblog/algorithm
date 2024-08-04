def calc_dislocation(perm):
    indexed_perm = []
    for i in range(0, len(perm)):
        indexed_perm.append((perm[i], i))
    indexed_perm.sort()
    dislocation = 0
    for i in range(0, len(indexed_perm)):
        dislocation += abs(indexed_perm[i][1] - i)
    return dislocation

def is_elements_same_in_both_arrays(l1, l2):
    l1.sort()
    l2.sort()
    return l1 == l2

def main():
    t = int(input())
    for i in range(0, t):
        n = int(input())
        l1 = list(map(int, input().split(' ')))
        l2 = list(map(int, input().split(' ')))
        if not is_elements_same_in_both_arrays(l1.copy(), l2.copy()):
            print("NO")
            continue
        if (calc_dislocation(l1) - calc_dislocation(l2)) % 4 == 0:
            print("YES")
        else:
            print("NO")
main()