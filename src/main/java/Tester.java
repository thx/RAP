import redis.clients.jedis.Jedis;

/**
 * Created by Bosn on 2014/8/16.
 */
public class Tester {
    public static void main(String[] args) {

        Jedis jedis = new Jedis("localhost");

        jedis.set("foo", "bar");
        String value = jedis.get("foo");
        System.out.println(value);
    }
}
